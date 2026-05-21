/**
 * Componente reutilizable para subir imágenes a Cloudinary
 * Utiliza react-dropzone para selección de archivos con drag & drop
 */

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadImage, checkConfig, ImageType } from '@/services/cloudinary';
import { toast } from 'react-hot-toast';
import { X, Upload, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  /** URL actual de la imagen (para edición) */
  currentImageUrl?: string | null;
  /** Callback cuando se completa la subida exitosamente */
  onUploadComplete: (url: string) => void;
  /** Callback cuando se elimina la imagen */
  onImageRemove?: () => void;
  /** Texto del botón/área de subida */
  label?: string;
  /** Subtítulo descriptivo */
  subtitle?: string;
  /** Ancho máximo de la vista previa (px) */
  previewWidth?: number;
  /** Alto máximo de la vista previa (px) */
  previewHeight?: number;
  /** Si es true, permite múltiples imágenes */
  multiple?: boolean;
  /** Icono personalizado para el área de subida */
  icon?: React.ReactNode;
  /** Texto cuando hay imagen cargada */
  changeText?: string;
  /** Clases CSS adicionales */
  className?: string;
  /** Acepta tipos específicos de imagen */
  accept?: Record<string, string[]>;
  /** Tamaño máximo del archivo en MB */
  maxSizeMB?: number;
  /** Si es true, muestra la imagen en tamaño completo */
  fullPreview?: boolean;
  /** Tipo de imagen para configurar compresión adecuada */
  imageType?: ImageType;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImageUrl,
  onUploadComplete,
  onImageRemove,
  label = 'Subir imagen',
  subtitle = 'Arrastra una imagen o haz clic para seleccionar',
  previewWidth = 300,
  previewHeight = 200,
  multiple = false,
  icon,
  changeText = 'Cambiar imagen',
  className = '',
  accept = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/gif': ['.gif'],
    'image/webp': ['.webp'],
  },
  maxSizeMB = 10,
  fullPreview = false,
  imageType = 'general',
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(currentImageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Verificar configuración al montar
  React.useEffect(() => {
    try {
      const config = checkConfig();
      if (!config.configured) {
        setError('Cloudinary no está configurado correctamente');
      }
    } catch (err) {
    }
  }, []);

  // Actualizar URL cuando cambia la prop
  React.useEffect(() => {
    setImageUrl(currentImageUrl || null);
  }, [currentImageUrl]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setError(null);

      // Validar tamaño
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        setError(`El archivo es demasiado grande (${fileSizeMB.toFixed(1)}MB). Máximo: ${maxSizeMB}MB`);
        toast.error(`Imagen muy grande. Máximo: ${maxSizeMB}MB`);
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);

      // Mostrar vista previa local mientras carga
      const localPreview = URL.createObjectURL(file);
      setImageUrl(localPreview);

      try {
        const url = await uploadImage(file, (progress) => {
          setUploadProgress(progress);
        }, imageType);

        // Limpiar vista previa local
        URL.revokeObjectURL(localPreview);

        setImageUrl(url);
        onUploadComplete(url);
        toast.success('Imagen subida exitosamente');

      } catch (err: any) {
        // Limpiar vista previa local en caso de error
        URL.revokeObjectURL(localPreview);
        setImageUrl(currentImageUrl || null);

        const errorMessage = err?.message || 'Error al subir la imagen';
        setError(errorMessage);
        toast.error(errorMessage);

      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [maxSizeMB, onUploadComplete, currentImageUrl, imageType]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles: multiple ? undefined : 1,
    multiple,
    disabled: isUploading,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageUrl(null);
    setError(null);
    if (onImageRemove) {
      onImageRemove();
    }
  };

  // Clases responsive para el contenedor
  const getContainerClass = () => {
    if (fullPreview) return 'w-full h-full aspect-auto';

    // Calcular clases responsive basado en previewWidth/Height
    const aspectRatio = previewWidth / previewHeight;
    const widthClass = 'w-full max-w-full';

    let heightClass = '';
    if (aspectRatio < 0.75) {
      // Portrait o cuadrado alto
      heightClass = 'h-48 sm:h-56 md:h-64';
    } else if (aspectRatio > 1.33) {
      // Landscape
      heightClass = 'h-32 sm:h-40 md:h-48 lg:h-56';
    } else {
      // Cuadrado
      heightClass = 'h-40 sm:h-48 md:h-56';
    }

    return `${widthClass} ${heightClass}`;
  };

  // Si hay una imagen cargada
  if (imageUrl && !isUploading) {
    return (
      <div
        className={`relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 ${className} ${getContainerClass()}`}
      >
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-full object-cover"
        />

        {/* Overlay con acciones */}
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
              <Upload size={16} />
              {changeText}
            </button>
          </div>

          {onImageRemove && (
            <button
              onClick={handleRemove}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <X size={16} />
              Eliminar
            </button>
          )}
        </div>

        {/* Botón flotante para eliminar */}
        {onImageRemove && (
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            title="Eliminar imagen"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }

  // Estado de subiendo
  if (isUploading) {
    return (
      <div
        className={`relative rounded-lg border-2 border-dashed border-blue-400 bg-blue-50 dark:bg-blue-900/20 flex flex-col items-center justify-center ${className} ${getContainerClass()}`}
      >
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-2" />
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Subiendo imagen...
        </p>
        {uploadProgress > 0 && (
          <div className="w-32 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {uploadProgress}%
        </p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div
        {...getRootProps()}
        className={`relative rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
          isDragActive ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-red-300 bg-red-50/50 dark:bg-red-900/10'
        } ${className} ${getContainerClass()}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
          <p className="text-sm font-medium text-red-700 dark:text-red-400">
            Error de configuración
          </p>
          <p className="text-xs text-red-600 dark:text-red-500 mt-1">
            {error}
          </p>
          <button className="mt-2 text-xs text-red-700 underline hover:no-underline">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Estado inicial / zona de drop
  return (
    <div
      {...getRootProps()}
      className={`relative rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
        isDragActive
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : isDragReject
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
      } ${className} ${getContainerClass()}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center p-3 sm:p-4 text-center">
        {icon || <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mb-1 sm:mb-2" />}
        <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0 sm:mt-1">
            {subtitle}
          </p>
        )}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Máximo: {maxSizeMB}MB
        </p>
      </div>
    </div>
  );
};

/**
 * Componente simplificado para subida de imágenes con vista previa cuadrada
 */
export const ImageUploadSquare: React.FC<Omit<ImageUploadProps, 'previewWidth' | 'previewHeight'>> = (props) => {
  return <ImageUpload {...props} previewWidth={200} previewHeight={200} imageType="thumbnail" />;
};

/**
 * Componente simplificado para banners (formato horizontal)
 */
export const ImageUploadBanner: React.FC<Omit<ImageUploadProps, 'previewWidth' | 'previewHeight'>> = (props) => {
  return <ImageUpload {...props} previewWidth={500} previewHeight={200} imageType="banner" />;
};

/**
 * Componente para subir múltiples imágenes
 */
export const MultipleImageUpload: React.FC<Omit<ImageUploadProps, 'multiple'> & {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}> = ({
  images,
  onImagesChange,
  maxImages = 5,
  ...props
}) => {
  const handleUploadComplete = (url: string) => {
    if (images.length < maxImages) {
      onImagesChange([...images, url]);
    }
  };

  const handleRemove = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Imágenes ya cargadas */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Imagen ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
              />
              <button
                onClick={() => handleRemove(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Botón para agregar más */}
      {images.length < maxImages && (
        <ImageUploadSquare
          {...props}
          onUploadComplete={handleUploadComplete}
          onImageRemove={undefined}
          label="Agregar imagen"
          subtitle={`${images.length}/${maxImages} imágenes`}
        />
      )}
    </div>
  );
};

export default ImageUpload;
