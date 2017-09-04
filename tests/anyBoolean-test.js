import _ from 'lodash'
import { anyBoolean } from '../src'

describe('anyBoolean', () => {
  it('returns a boolean', () => {
    expect(anyBoolean()).toEqual(expect.any(Boolean))
  })

  it('returns true about 50% of the time, false otherwise', () => {
    let trueCount = 0
    let falseCount = 0

    _.times(ASSERTIONS * 1000, () => {
      const boolean = anyBoolean()
      if (boolean === true) trueCount += 1
      if (boolean === false) falseCount += 1
    })

    expect(trueCount / falseCount).toBeCloseTo(1, 1)
  })
})
