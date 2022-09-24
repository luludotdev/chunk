import { expect, test } from 'vitest'
import { chunk } from '../src/chunk.js'
import { createArray } from './array.js'

test('chunks an array correctly', () => {
  const test = createArray(10)

  expect(chunk(test, 5)).toEqual({
    chunks: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
    ],
    rest: [],
  })

  expect(chunk(test, 4)).toEqual({
    chunks: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ],
    rest: [9, 10],
  })

  expect(chunk(test, 3)).toEqual({
    chunks: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    rest: [10],
  })

  expect(chunk(test, 2)).toEqual({
    chunks: [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
    ],
    rest: [],
  })

  expect(chunk(test, 1)).toEqual({
    chunks: [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]],
    rest: [],
  })
})

test('handles zero length arrays', () => {
  const test: number[] = []

  expect(chunk(test, 1)).toEqual({ chunks: [], rest: [] })
  expect(chunk(test, 2)).toEqual({ chunks: [], rest: [] })
  expect(chunk(test, 3)).toEqual({ chunks: [], rest: [] })
  expect(chunk(test, 4)).toEqual({ chunks: [], rest: [] })
  expect(chunk(test, 5)).toEqual({ chunks: [], rest: [] })
  expect(chunk(test, 6)).toEqual({ chunks: [], rest: [] })
})

test('handles single chunk arrays', () => {
  const test2 = createArray(2)
  expect(chunk(test2, 2)).toEqual({ chunks: test2, rest: [] })

  const test3 = createArray(3)
  expect(chunk(test3, 3)).toEqual({ chunks: test3, rest: [] })

  const test4 = createArray(4)
  expect(chunk(test4, 4)).toEqual({ chunks: test4, rest: [] })

  const test6 = createArray(6)
  expect(chunk(test6, 6)).toEqual({ chunks: test6, rest: [] })
})

test('throws if `size` is less than 1', () => {
  const test = createArray(12)

  expect(() => chunk(test, -1)).toThrow('greater than')
  expect(() => chunk(test, 0)).toThrow('greater than')
})
