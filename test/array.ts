export const createArray = (length: number) =>
  Array.from({ length }).map((_, idx) => idx + 1)
