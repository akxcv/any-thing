import _ from 'lodash'
import { anyArray } from '../src'

const arrayDepth = array => {
  const depths = array.map(x => {
    if (Array.isArray(x)) return 1 + arrayDepth(x)
    if (_.isObject(x)) return arrayDepth(Object.values(x))
    else return 1
  })
  return Math.max(...depths, 0)
}

describe('anyArray', () => {
  it('returns an array', () => {
    expect(anyArray()).toEqual(expect.any(Array))
  })

  it('returns an array of length between 0 and 10 by default', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const length = anyArray().length
      expect(length >= 0 && length <= 10).toBe(true)
    })
  })

  it('returns an array of length between minLength and maxLength', () => {
    const MIN_LENGTH = 2
    const MAX_LENGTH = 5

    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const length = anyArray({ minLength: MIN_LENGTH, maxLength: MAX_LENGTH }).length
      expect(length >= MIN_LENGTH && length <= MAX_LENGTH).toBe(true)
    })
  })

  it('returns an array no deeper than 3 by default', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      expect(arrayDepth(anyArray())).toBeLessThanOrEqual(3)
    })
  })

  it('returns an array no deeper than maxDepth', () => {
    const MAX_DEPTH = 2

    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      expect(arrayDepth(anyArray({ maxDepth: MAX_DEPTH }))).toBeLessThanOrEqual(MAX_DEPTH)
    })
  })
})
