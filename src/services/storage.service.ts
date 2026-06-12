export function storageGet<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    return null;
  }
}

export function storageSet<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function storageGetString(key: string): string {
  return localStorage.getItem(key) ?? '';
}

export function storageSetString(key: string, value: string): void {
  localStorage.setItem(key, value);
}
