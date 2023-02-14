export const getMappedObject = <T extends object>(object: T, ...keysToRemove: (keyof T)[]): T =>
  Object.entries(object).reduce((prev, [key, value]) => {
    if (keysToRemove.includes(key as keyof T)) return prev;
    return { ...prev, [key]: value };
  }, {} as T);
