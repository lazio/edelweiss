export function panic<T>(message: string): T;
export function panic<T, U extends ErrorConstructor>(
  message: string,
  constructorType: U
): T;
export function panic<T, U extends ErrorConstructor>(
  message: string,
  constructorType?: U
): T {
  throw new (constructorType || Error)(message);
}
