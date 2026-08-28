function sortByCreatedAt<T extends { createdAt: string }>(data: T[]): T[] {
  return data.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export { sortByCreatedAt };
