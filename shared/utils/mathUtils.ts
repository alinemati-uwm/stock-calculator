export function linspace(start: number, stop: number, num: number): number[] {
  if (num <= 0) throw new Error("Number of points must be positive")
  if (start === stop) return Array(num).fill(start)
  const step = (stop - start) / (num - 1)
  return Array.from({ length: num }, (_, i) => roundToDecimal(start + step * i, 2))
}

export function roundToDecimal(value: number, decimals: number): number {
  return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals)
}
