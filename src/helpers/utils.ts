export function shuffleAndSliceArray<T> (arrayOfThings: T[], numberToGet: number): T[] {
  return arrayOfThings && arrayOfThings.length
    ? arrayOfThings
      .map(x => ({ x, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(a => a.x)
      .slice(0, numberToGet)
    : [];
}

export const getRandomIndex = (max: number, numToGet: number): number[] => {
  const nums = new Set<number>();
  while(nums.size !== numToGet) {
    nums.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(nums);
}