import _ from 'lodash'
import { anyFunction } from '../src'

const functionDepth = maybeFunc => {
  if (typeof maybeFunc === 'function') {
    const result = maybeFunc()
    if (Array.isArray(result)) return 1 + functionDepth(result)
    if (typeof result === 'function') return 1 + functionDepth(result)
    return _.isObject(result) ? 1 + functionDepth(Object.values(result)) : 1
  } else if (Array.isArray(maybeFunc)) {
    const depths = maybeFunc.map(x => {
      if (Array.isArray(x)) return functionDepth(x)
      if (_.isObject(x)) return functionDepth(Object.values(x))
      if (typeof x === 'function') return functionDepth(x)
      else return 0
    })
    return Math.max(...depths, 0)
  }
}

describe('anyFunction', () => {
  it('returns a function', () => {
    expect(typeof anyFunction()).toBe('function')
  })

  it('returns a function no deeper than 3 by default', () => {
    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      expect(functionDepth(anyFunction())).toBeLessThanOrEqual(3)
    })
  })

  it('returns a function no deeper than maxDepth', () => {
    const MAX_DEPTH = 2

    expect.assertions(ASSERTIONS)
    _.times(ASSERTIONS, () => {
      expect(functionDepth(anyFunction({ maxDepth: MAX_DEPTH }))).toBeLessThanOrEqual(MAX_DEPTH)
    })
  })
})
