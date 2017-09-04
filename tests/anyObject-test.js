import _ from 'lodash'
import { anyObject } from '../src'

const objectDepth = maybeObj => {
  const values = Array.isArray(maybeObj) ? maybeObj : Object.values(maybeObj)
  const depths = values.map(x => {
    if (Array.isArray(x)) return objectDepth(x)
    if (typeof x !== 'function' && _.isObject(x)) return 1 + objectDepth(Object.values(x))
    else return 1
  })
  return Math.max(...depths, 0)
}

describe('anyObject', () => {
  it('returns an object', () => {
    expect(_.isObject(anyObject())).toBe(true)
  })

  it('returns an object of length between 0 and 10 by default', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const length = Object.values(anyObject()).length
      expect(length >= 0 && length <= 10).toBe(true)
    })
  })

  it('returns an object of length between minLength and maxLength', () => {
    const MIN_LENGTH = 2
    const MAX_LENGTH = 5

    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const length = Object.values(anyObject({ minLength: MIN_LENGTH, maxLength: MAX_LENGTH }))
        .length
      expect(length >= MIN_LENGTH && length <= MAX_LENGTH).toBe(true)
    })
  })

  it('returns an object no deeper than 3 by default', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      expect(objectDepth(anyObject())).toBeLessThanOrEqual(3)
    })
  })

  it('returns an object no deeper than maxDepth', () => {
    const MAX_DEPTH = 2

    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      expect(objectDepth(anyObject({ maxDepth: MAX_DEPTH }))).toBeLessThanOrEqual(MAX_DEPTH)
    })
  })

  it('returns an object with string keys of between 1 and 20 chars by default', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const keys = Object.keys(anyObject())
      expect(keys.every(key => key.length >= 1 && key.length <= 20)).toBe(true)
    })
  })

  it('returns an object with string keys of between min and max stringLength chars', () => {
    const MIN_STRING_LENGTH = 3
    const MAX_STRING_LENGTH = 5

    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const keys = Object.keys(
        anyObject({ minStringLength: MIN_STRING_LENGTH, maxStringLength: MAX_STRING_LENGTH })
      )
      expect(
        keys.every(key => key.length >= MIN_STRING_LENGTH && key.length <= MAX_STRING_LENGTH)
      ).toBe(true)
    })
  })

  it('returns an object with strings from an alphabet', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const keys = Object.keys(anyObject({ alphabet: '!@#$%^' }))
      expect(keys.every(key => key.match(/^[!@#$%^]+$/))).toBe(true)
    })
  })
})
