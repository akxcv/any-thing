import _ from 'lodash'
import { anyNumber } from '../src'

describe('anyNumber', () => {
  it('returns a number', () => {
    expect(typeof anyNumber()).toBe('number')
  })

  it('returns an integer between -1M and +1M by default', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const int = anyNumber()
      expect(int >= -1000000 && int <= 1000000).toBe(true)
    })
  })

  it('returns an integer between min and max', () => {
    const MIN = -0.9
    const MAX = 0.123

    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      const int = anyNumber({ min: MIN, max: MAX })
      expect(int >= MIN && int <= MAX).toBe(true)
    })
  })
})
