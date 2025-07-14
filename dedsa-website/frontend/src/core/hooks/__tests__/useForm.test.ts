import { renderHook, act } from '@testing-library/react';
import { useForm } from '../useForm';

describe('useForm', () => {
  const initialValues = { name: '', email: '' };
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('initializes with provided values', () => {
    const { result } = renderHook(() =>
      useForm({ initialValues, onSubmit: mockSubmit })
    );

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('updates values on change', () => {
    const { result } = renderHook(() =>
      useForm({ initialValues, onSubmit: mockSubmit })
    );

    const event = {
      target: { name: 'name', value: 'John Doe' },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.values.name).toBe('John Doe');
  });

  it('validates on submit', async () => {
    const validate = jest.fn().mockReturnValue({
      isValid: false,
      errors: { email: 'Invalid email' },
    });

    const { result } = renderHook(() =>
      useForm({ initialValues, validate, onSubmit: mockSubmit })
    );

    const event = { preventDefault: jest.fn() } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(validate).toHaveBeenCalledWith(initialValues);
    expect(result.current.errors).toEqual({ email: 'Invalid email' });
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('submits when validation passes', async () => {
    const { result } = renderHook(() =>
      useForm({ initialValues, onSubmit: mockSubmit })
    );

    const event = { preventDefault: jest.fn() } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(mockSubmit).toHaveBeenCalledWith(initialValues);
  });

  it('resets form to initial values', () => {
    const { result } = renderHook(() =>
      useForm({ initialValues, onSubmit: mockSubmit })
    );

    act(() => {
      result.current.setValues({ name: 'Test', email: 'test@test.com' });
      result.current.setErrors({ name: 'Error' });
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });
});
