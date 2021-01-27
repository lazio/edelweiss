export function isIterable<T>(value: unknown): value is Iterable<T> {
  return (
    typeof value === 'object' && value !== null && Symbol.iterator in value
  );
}
