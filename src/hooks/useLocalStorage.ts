import { useState } from 'react';
import { storageGet, storageSet } from '../services/storage.service';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storageGet<T>(key) ?? initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    storageSet(key, value);
  };

  return [storedValue, setValue] as const;
}
