export function roundNumber(num: number, decimalPlaces: number = 0): number {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(num * multiplier) / multiplier;
  }