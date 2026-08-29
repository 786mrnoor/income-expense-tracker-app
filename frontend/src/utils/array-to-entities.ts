export function arrayToEntities<T extends { id: string }>(
  array: T[],
): Record<T["id"], T> {
  return Object.fromEntries(array.map((item) => [item["id"], item])) as Record<
    T["id"],
    T
  >;
}
