export {} // satisfy the "isolatedModules: true" setting, if we don't have any imports

declare global {
  type Values<T> = T[keyof T]
  type Dict<T = unknown> = Record<string, T>
  type Func<T = any> = (...args: any[]) => T // eslint-disable-line @typescript-eslint/no-explicit-any
}
