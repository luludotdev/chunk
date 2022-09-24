import type { Tuple } from './tuple.type'

/**
 * Split an array into `size` length chunks.
 * Array length must be an exact multiple of `size`.
 *
 * @param array - Array to split into chunks
 * @param size - Chunk size
 */
export function chunkStrict<T, N extends number>(
  array: T[],
  size: N,
): Tuple<T, N>[] {
  if (size < 1) {
    throw new Error('`size` must be greater than 0')
  }

  // Optimized paths
  if (array.length === 0) return []
  if (array.length === size) return array as Tuple<T, N>[]

  if (array.length % size !== 0) {
    throw new Error('`array` must be a multiple of `size`')
  }

  const results: Tuple<T, N>[] = []
  for (let x = 0; x < Math.ceil(array.length / size); x++) {
    const start = x * size
    const end = start + size

    const chunk = array.slice(start, end) as Tuple<T, N>
    results.push(chunk)
  }

  return results
}
