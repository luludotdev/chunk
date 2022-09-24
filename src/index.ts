type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : TupleOf<T, N, []>
  : never

type TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : TupleOf<T, N, [T, ...R]>

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
