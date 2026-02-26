export type Brand<K, T> = K & { __brand: T };

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
