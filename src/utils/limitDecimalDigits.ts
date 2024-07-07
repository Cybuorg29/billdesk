export function limitDecimalDigits(num: number | undefined): number {
  if (!num) return 0
  return Math.round(num * 100) / 100;
}