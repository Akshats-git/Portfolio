// Keep a small result set from stranding one lonely card in a three-column row.
export const gridColsForCount = (count: number) =>
  count <= 1
    ? "grid-cols-1 max-w-xl"
    : count === 2
      ? "grid-cols-1 md:grid-cols-2 max-w-4xl"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
