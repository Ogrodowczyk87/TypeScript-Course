import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// Przeciążenia funkcji
export function usePersistedState<T>(key: string): [T | undefined, Dispatch<SetStateAction<T | undefined>>];
export function usePersistedState<T>(key: string, initial: T): [T, Dispatch<SetStateAction<T>>];

export function usePersistedState<T>(key: string, initial?: T): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const getInitialValue = (): T | undefined => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue) as T;
      } catch {
        console.error(`Error parsing value for key "${key}" from localStorage.`);
        return initial;
      }
    }
    return initial;
  };

  const [state, setState] = useState<T | undefined>(getInitialValue());

  useEffect(() => {
    const newValue = getInitialValue();
    setState(newValue);
  }, [key]);

  useEffect(() => {
    if (state !== undefined) {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error(`Error saving value for key "${key}" to localStorage:`, error);
      }
    } else {
      localStorage.removeItem(key);
    }
  }, [key, state]);

  return [state, setState] as const;
}
