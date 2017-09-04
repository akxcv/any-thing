import _ from 'lodash'
import { anyString } from '../src'

describe('anyString', () => {
  it('returns a string', () => {
    expect(typeof anyString()).toBe('string')
  })

  it('returns a string of between 0 and 10 chars by default', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const length = anyString().length
      expect(length >= 0 && length <= 10).toBe(true)
    })
  })

  it('returns a string of between minLength and maxLength chars by default', () => {
    const MIN_LENGTH = 2
    const MAX_LENGTH = 8

    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const length = anyString({ minLength: MIN_LENGTH, maxLength: MAX_LENGTH }).length
      expect(length >= MIN_LENGTH && length <= MAX_LENGTH).toBe(true)
    })
  })

  it('returns a string from english alphabet and numbers by default', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      expect(
        !!anyString().match(/^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]*$/)
      ).toBe(true)
    })
  })

  it('returns a string from given alphabet', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      expect(!!anyString({ alphabet: '!@#$%^&123' }).match(/^[!@#$%^&123]*$/)).toBe(true)
    })
  })

  it('accepts an alphabet as an array of chars', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      expect(
        !!anyString({ alphabet: ['!', '@', '#', '$', '%', '^', '&', '1', '2', '3'] }).match(
          /^[!@#$%^&123]*$/
        )
      ).toBe(true)
    })
  })
})
