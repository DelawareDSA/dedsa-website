export interface UseFormProps<T> {
  initialValues: T;
  validate?: (values: T) => ValidationResult;
  onSubmit: (values: T) => void | Promise<void>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface UseInfiniteScrollProps {
  threshold?: number;
  onLoadMore: () => Promise<void>;
}

export type SubscriptionStatus = 'idle' | 'submitting' | 'success' | 'error';
