'use client';

import { ChangeEvent, useCallback, useState } from 'react';

import { UseFormProps } from '@/core/types/hooks';

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (validate) {
        const validationResult = validate(values);
        if (!validationResult.isValid) {
          setErrors(validationResult.errors);
          return;
        }
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);

        setValues(initialValues);
        setErrors({});
      } catch (error) {
        if (error instanceof Error) {
          setErrors({ submit: error.message });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit, initialValues]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setValues,
    setErrors,
  };
}
