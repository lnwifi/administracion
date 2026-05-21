/**
 * Servicio para subir imágenes a Cloudinary desde el panel de administración
 * Compatible con el sistema de subida de la app móvil
 */

// Configuración de Cloudinary desde variables de entorno
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'mascotas';
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;

// Tiempo máximo de espera para la subida (30 segundos)
const UPLOAD_TIMEOUT = 30000;

// Tamaño máximo de archivo (10MB para web)
const MAX_FILE_SIZE_MB = 10;

// Configuración de compresión por tipo de imagen
const COMPRESSION_CONFIG = {
  avatar: { maxWidth: 400, maxHeight: 400, quality: 0.8 },
  thumbnail: { maxWidth: 600, maxHeight: 600, quality: 0.8 },
  banner: { maxWidth: 1920, maxHeight: 600, quality: 0.85 },
  product: { maxWidth: 800, maxHeight: 800, quality: 0.85 },
  general: { maxWidth: 1200, maxHeight: 1200, quality: 0.85 },
};

export type ImageType = 'avatar' | 'thumbnail' | 'banner' | 'product' | 'general';

/**
 * Comprime una imagen usando Canvas API
 * @param file Archivo de imagen original
 * @param type Tipo de imagen para aplicar configuración de compresión
 * @returns Promise<File> Archivo comprimido
 */
async function compressImage(
  file: File,
  type: ImageType = 'general'
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      try {
        const config = COMPRESSION_CONFIG[type];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('No se pudo crear el contexto del canvas'));
          return;
        }

        // Calcular dimensiones manteniendo aspecto
        let width = img.width;
        let height = img.height;

        if (width > config.maxWidth || height > config.maxHeight) {
          const ratio = Math.min(config.maxWidth / width, config.maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;

        // Dibujar imagen comprimida
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a blob con compresión
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('No se pudo comprimir la imagen'));
              return;
            }

            // Crear nuevo File con el blob comprimido
            const compressedFile = new File([blob], file.name, {
              type: 'image/webp', // Usar WebP para mejor compresión
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          'image/webp',
          config.quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Error al cargar la imagen'));
    reader.onerror = () => reject(new Error('Error al leer el archivo'));

    reader.readAsDataURL(file);
  });
}

/**
 * Valida que la configuración de Cloudinary esté completa
 */
function validateConfig(): void {
  if (!CLOUD_NAME) {
    throw new Error('Falta VITE_CLOUDINARY_CLOUD_NAME en las variables de entorno');
  }

}

/**
 * Sube una imagen a Cloudinary
 * @param file Archivo de imagen (File o Blob)
 * @param onProgress Callback opcional para seguimiento del progreso (0-100)
 * @param imageType Tipo de imagen para aplicar compresión adecuada
 * @returns URL pública de la imagen subida
 */
export async function uploadImage(
  file: File,
  onProgress?: (progress: number) => void,
  imageType: ImageType = 'general'
): Promise<string> {
  validateConfig();

  const updateProgress = (progress: number) => {
    if (onProgress) onProgress(progress);
  };

  // Validar tipo de archivo
  if (!file.type.startsWith('image/')) {
    throw new Error('El archivo debe ser una imagen (JPG, PNG, GIF, WebP)');
  }

  // Validar tamaño
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_FILE_SIZE_MB) {
    throw new Error(`La imagen es demasiado grande (${fileSizeMB.toFixed(1)}MB). El tamaño máximo es ${MAX_FILE_SIZE_MB}MB`);
  }

  updateProgress(10);

  // Comprimir imagen antes de subir
  let compressedFile = file;
  try {
    updateProgress(20);
    compressedFile = await compressImage(file, imageType);
    updateProgress(40);
  } catch (compressError) {
    updateProgress(40);
  }

  try {
    // Construir URL de subida
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    // Crear FormData
    const formData = new FormData();
    formData.append('file', compressedFile);
    formData.append('upload_preset', UPLOAD_PRESET);

    // Parámetros de optimización para Cloudinary
    formData.append('quality', 'auto:good');
    formData.append('fetch_format', 'webp');
    formData.append('f_auto', 'true');

    updateProgress(30);

    // Configurar timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT);

    // Simular progreso durante la subida
    const progressInterval = setInterval(() => {
      updateProgress(Math.min(90, 30 + Math.random() * 40));
    }, 500);

    try {
      // Realizar la petición
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      updateProgress(95);

      // Manejar errores
      if (!response.ok) {
        const errorText = await response.text();
        if (errorText.includes('Invalid upload preset')) {
          throw new Error(`El upload preset "${UPLOAD_PRESET}" no existe en Cloudinary. Configura un preset unsigned con este nombre.`);
        }
        if (errorText.includes('Invalid cloud name')) {
          throw new Error('El cloud name de Cloudinary es inválido. Verifica VITE_CLOUDINARY_CLOUD_NAME');
        }

        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.secure_url) {
        throw new Error('No se pudo obtener la URL de la imagen subida');
      }

      updateProgress(100);
      return data.secure_url;

    } catch (error: any) {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);

      if (error.name === 'AbortError') {
        throw new Error('La subida está tardando demasiado. Verifica tu conexión e inténtalo de nuevo.');
      }

      if (error.message?.includes('Network') || error.message?.includes('fetch')) {
        throw new Error('No se pudo conectar con Cloudinary. Verifica tu conexión a Internet');
      }

      throw error;
    }

  } catch (error: any) {
    throw new Error(error.message || 'Ocurrió un error al subir la imagen');
  }
}

/**
 * Sube múltiples imágenes a Cloudinary
 * @param files Array de archivos de imagen
 * @param onProgress Callback para seguimiento del progreso general
 * @param imageType Tipo de imagen para aplicar compresión adecuada
 * @returns Array de URLs públicas de las imágenes subidas
 */
export async function uploadImages(
  files: File[],
  onProgress?: (progress: number, current: number, total: number) => void,
  imageType: ImageType = 'general'
): Promise<string[]> {
  if (files.length === 0) return [];

  const total = files.length;
  const results: string[] = [];
  let completed = 0;

  for (let i = 0; i < total; i++) {
    try {
      const url = await uploadImage(files[i], (fileProgress) => {
        // Calcular progreso general
        // Calcular progreso general
        const baseProgress = (completed / total) * 100;
        const fileProgressShare = (fileProgress / 100) * (100 / total);
        const overallProgress = Math.min(99, baseProgress + fileProgressShare);

        if (onProgress) {
          onProgress(Math.round(overallProgress), i + 1, total);
        }
      });

      results.push(url);
      completed++;

    } catch (error) {
      // Continuar con las demás imágenes
    }
  }

  if (onProgress) {
    onProgress(100, total, total);
  }

  return results;
}

/**
 * Elimina una imagen de Cloudinary
 * Nota: Requiere el API secret que no debería estar expuesto en el cliente
 * Esta función debería llamarse desde una Edge Function de Supabase
 */
export async function deleteImage(publicUrl: string): Promise<void> {
  if (!publicUrl || !publicUrl.includes('cloudinary.com')) {
    return;
  }

  // Esta es una operación que requiere el API secret
  // Delegar a la Edge Function delete_cloudinary_image
}

/**
 * Obtiene una URL optimizada de Cloudinary
 * @param publicUrl URL de la imagen
 * @param transformations Transformaciones opcionales (ancho, alto, calidad, etc.)
 * @returns URL optimizada
 */
export function getOptimizedUrl(
  publicUrl: string | null | undefined,
  transformations: {
    width?: number;
    height?: number;
    quality?: string;
    crop?: string;
    format?: string;
  } = {}
): string {
  if (!publicUrl) {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzljYTVhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNpbiBpbWFnZW48L3RleHQ+PC9zdmc+';
  }

  // Si no hay transformaciones, devolver la URL original
  if (Object.keys(transformations).length === 0) {
    return publicUrl;
  }

  // Si ya es una URL optimizada de Cloudinary, devolverla tal cual
  if (publicUrl.includes('res.cloudinary.com') && publicUrl.includes('/upload/')) {
    return publicUrl;
  }

  try {
    // Extraer public_id de la URL
    const url = new URL(publicUrl);
    const pathParts = url.pathname.split('/upload/');

    if (pathParts.length < 2) {
      return publicUrl;
    }

    const publicId = pathParts[1];
    const cloudName = CLOUD_NAME;

    // Construir transformaciones
    const transforms: string[] = [];

    if (transformations.width) transforms.push(`w_${transformations.width}`);
    if (transformations.height) transforms.push(`h_${transformations.height}`);
    if (transformations.crop) transforms.push(`c_${transformations.crop}`);
    if (transformations.quality) transforms.push(`q_${transformations.quality}`);
    if (transformations.format) transforms.push(`f_${transformations.format}`);

    const transformString = transforms.join(',');

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`;

  } catch (error) {
    return publicUrl;
  }
}

/**
 * Tipos de transformaciones predefinidas
 */
export const ImageTransforms = {
  avatar: (url: string) => getOptimizedUrl(url, { width: 150, height: 150, crop: 'fill', quality: 'auto:good' }),
  thumbnail: (url: string) => getOptimizedUrl(url, { width: 300, height: 300, crop: 'fill', quality: 'auto:good' }),
  card: (url: string) => getOptimizedUrl(url, { width: 400, height: 300, crop: 'fill', quality: 'auto:good' }),
  banner: (url: string) => getOptimizedUrl(url, { width: 1200, height: 400, crop: 'fill', quality: 'auto:good' }),
  full: (url: string) => getOptimizedUrl(url, { width: 1920, quality: 'auto:best' }),
};

/**
 * Verifica la configuración de Cloudinary
 */
export function checkConfig(): {
  configured: boolean;
  cloudName?: string;
  uploadPreset?: string;
  apiKey?: string;
  errors: string[];
} {
  const errors: string[] = [];

  try {
    if (!CLOUD_NAME) errors.push('Falta VITE_CLOUDINARY_CLOUD_NAME');
    if (!UPLOAD_PRESET) errors.push('Falta VITE_CLOUDINARY_UPLOAD_PRESET');
    // API_KEY es opcional para upload preset unsigned
    // if (!API_KEY) errors.push('Falta VITE_CLOUDINARY_API_KEY');

    return {
      configured: errors.length === 0,
      cloudName: CLOUD_NAME || undefined,
      uploadPreset: UPLOAD_PRESET || undefined,
      apiKey: API_KEY ? API_KEY.replace(/./g, '*') : undefined, // Ocultar API key
      errors,
    };
  } catch (err) {
    return {
      configured: false,
      errors: ['Error al verificar configuración'],
    };
  }
}
