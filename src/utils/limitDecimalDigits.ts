export function limitDecimalDigits(num: number): number {
    return Math.round(num * 100) / 100;
  }