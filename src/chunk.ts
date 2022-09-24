import { chunkStrict } from './chunkStrict.js'
import type { Tuple } from './tuple.type'

/**
 * Split an array into `size` length chunks.
 * If the array length is not an exact multiple of `size`,
 * the remaining elements will be returned separately.
 *
 * @param array - Array to split into chunks
 * @param size - Chunk size
 */
export function chunk<T, N extends number>(
  array: T[],
  size: N,
): { chunks: Tuple<T, N>[]; rest: T[] } {
  if (size < 1) {
    throw new Error('`size` must be greater than 0')
  }

  // Optimized paths
  if (array.length === 0) return { chunks: [], rest: [] }
  if (array.length === size) {
    return {
      chunks: array as Tuple<T, N>[],
      rest: [],
    }
  }

  const remaining = array.length % size
  const chunks = chunkStrict(array.slice(0, -remaining), size)
  const rest = array.slice(-remaining)

  return { chunks, rest }
}
