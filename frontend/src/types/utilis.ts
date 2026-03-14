export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;


type Impossible<K extends keyof any> = { [P in K]: never; };
export type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>;