import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'initialValue')
    );

    expect(result.current[0]).toBe('initialValue');
  });

  it('returns value from localStorage if exists', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'));

    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'initialValue')
    );

    expect(result.current[0]).toBe('storedValue');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'initialValue')
    );

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(localStorage.getItem('testKey')).toBe('"newValue"');
  });

  it('handles function updates', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 0));

    act(() => {
      result.current[1]((prev: number) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('syncs across windows via storage event', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

    const storageEvent = new StorageEvent('storage', {
      key: 'testKey',
      newValue: '"external"',
      storageArea: localStorage,
    });

    act(() => {
      window.dispatchEvent(storageEvent);
    });

    expect(result.current[0]).toBe('external');
  });
});
