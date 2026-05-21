import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle } from 'lucide-react';

export interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label for the input */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below input */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Container className */
  containerClassName?: string;
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ label, error, helperText, required, containerClassName, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    return (
      <div className={cn('space-y-1.5', containerClassName)}>
        {label && (
          <Label htmlFor={inputId} className={cn('text-sm font-medium', hasError && 'text-destructive')}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <div className="relative">
          <Input
            id={inputId}
            ref={ref}
            className={cn(
              hasError && 'border-destructive focus:border-destructive focus:ring-destructive',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {hasError && (
            <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive pointer-events-none" />
          )}
        </div>
        {hasError && (
          <p id={`${inputId}-error`} className="text-xs text-destructive flex items-center gap-1">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

ValidatedInput.displayName = 'ValidatedInput';

/**
 * Validated Textarea component
 */
import { Textarea as BaseTextarea } from '@/components/ui/textarea';

export interface ValidatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerClassName?: string;
}

export const ValidatedTextarea = forwardRef<HTMLTextAreaElement, ValidatedTextareaProps>(
  ({ label, error, helperText, required, containerClassName, className, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    return (
      <div className={cn('space-y-1.5', containerClassName)}>
        {label && (
          <Label htmlFor={textareaId} className={cn('text-sm font-medium', hasError && 'text-destructive')}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <div className="relative">
          <BaseTextarea
            id={textareaId}
            ref={ref}
            className={cn(
              hasError && 'border-destructive focus:border-destructive focus:ring-destructive',
              'min-h-[80px]',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
            }
            {...props}
          />
        </div>
        {hasError && (
          <p id={`${textareaId}-error`} className="text-xs text-destructive flex items-center gap-1">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={`${textareaId}-helper`} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

ValidatedTextarea.displayName = 'ValidatedTextarea';

/**
 * Validation rules helper
 */
export interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

export const ValidationRules = {
  required: (value: string) => ({
    validate: (v: string) => v.trim().length > 0,
    message: `${value} es obligatorio`,
  }),

  email: {
    validate: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message: 'Ingresa un email válido',
  },

  minLength: (min: number, fieldName = 'Este campo') => ({
    validate: (v: string) => v.length >= min,
    message: `${fieldName} debe tener al menos ${min} caracteres`,
  }),

  maxLength: (max: number, fieldName = 'Este campo') => ({
    validate: (v: string) => v.length <= max,
    message: `${fieldName} no puede exceder ${max} caracteres`,
  }),

  numeric: {
    validate: (v: string) => /^\d+(\.\d+)?$/.test(v),
    message: 'Ingresa un número válido',
  },

  positive: {
    validate: (v: string) => parseFloat(v) > 0,
    message: 'El valor debe ser mayor a 0',
  },

  url: {
    validate: (v: string) => {
      try {
        new URL(v);
        return true;
      } catch {
        return false;
      }
    },
    message: 'Ingresa una URL válida',
  },
};

/**
 * Hook for form validation
 */
export function useValidatedForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = React.useState<T>(initialValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = (field: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const setFieldTouched = (field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const setError = (field: keyof T, error: string | undefined) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateField = (field: keyof T, rules: ValidationRule[]): boolean => {
    for (const rule of rules) {
      if (!rule.validate(values[field])) {
        setErrors(prev => ({ ...prev, [field]: rule.message }));
        return false;
      }
    }
    setErrors(prev => ({ ...prev, [field]: undefined }));
    return true;
  };

  const validateForm = (fieldRules: Partial<Record<keyof T, ValidationRule[]>>): boolean => {
    let isValid = true;
    const newErrors: Partial<Record<keyof T, string>> = {};

    for (const [field, rules] of Object.entries(fieldRules)) {
      if (rules) {
        for (const rule of rules) {
          if (!rule.validate(values[field as keyof T])) {
            newErrors[field as keyof T] = rule.message;
            isValid = false;
            break;
          }
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setError,
    setFieldTouched,
    validateField,
    validateForm,
    reset,
    hasErrors: Object.keys(errors).some(key => errors[key as keyof T] !== undefined),
  };
}
