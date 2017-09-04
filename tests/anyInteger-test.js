import _ from 'lodash'
import { anyInteger } from '../src'

describe('anyInteger', () => {
  it('returns an integer', () => {
    const int = anyInteger()
    expect(int).toEqual(expect.any(Number))
    expect(int % 1).toBe(0)
  })

  it('returns an integer between -1M and +1M by default', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const int = anyInteger()
      expect(int >= -1000000 && int <= 1000000).toBe(true)
    })
  })

  it('returns an integer between min and max', () => {
    const MIN = 4
    const MAX = 9

    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const int = anyInteger({ min: MIN, max: MAX })
      expect(int >= MIN && int <= MAX).toBe(true)
    })
  })
})
