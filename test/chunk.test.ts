import { expect, describe, it } from 'vitest'
import { chunkStrict } from '../src/index.js'

const createArray = (length: number) =>
  Array.from({ length }).map((_, idx) => idx + 1)

describe('chunk', () => {
  // TODO
})

describe('chunkExact', () => {
  it('chunks an array correctly', () => {
    const test = createArray(12)

    expect(chunkStrict(test, 6)).toEqual([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ])

    expect(chunkStrict(test, 4)).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ])

    expect(chunkStrict(test, 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
    ])

    expect(chunkStrict(test, 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
      [11, 12],
    ])

    expect(chunkStrict(test, 1)).toEqual([
      [1],
      [2],
      [3],
      [4],
      [5],
      [6],
      [7],
      [8],
      [9],
      [10],
      [11],
      [12],
    ])
  })

  it('handles zero length arrays', () => {
    const test: number[] = []

    expect(chunkStrict(test, 1)).toEqual([])
    expect(chunkStrict(test, 2)).toEqual([])
    expect(chunkStrict(test, 3)).toEqual([])
    expect(chunkStrict(test, 4)).toEqual([])
    expect(chunkStrict(test, 5)).toEqual([])
    expect(chunkStrict(test, 6)).toEqual([])
  })

  it('handles single chunk arrays', () => {
    const test2 = createArray(2)
    expect(chunkStrict(test2, 2)).toEqual(test2)

    const test3 = createArray(3)
    expect(chunkStrict(test3, 3)).toEqual(test3)

    const test4 = createArray(4)
    expect(chunkStrict(test4, 4)).toEqual(test4)

    const test6 = createArray(6)
    expect(chunkStrict(test6, 6)).toEqual(test6)
  })

  it('throws if `size` is less than 1', () => {
    const test = createArray(12)

    // @ts-expect-error Infinite type recursion
    expect(() => chunkStrict(test, -1)).toThrow('greater than')
    expect(() => chunkStrict(test, 0)).toThrow('greater than')
  })
})
