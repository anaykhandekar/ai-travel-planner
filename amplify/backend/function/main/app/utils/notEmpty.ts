// https://stackoverflow.com/a/46700791
export default function <TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}
