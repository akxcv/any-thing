import _ from 'lodash'
import { anything } from '../src'

const makeCounters = () => ({
  array: 0,
  boolean: 0,
  function: 0,
  integer: 0,
  number: 0,
  object: 0,
  string: 0,
  null: 0,
  undefined: 0,
  other: 0,
})

/* eslint-disable no-param-reassign */
const runAssertions = (counters, fn) => {
  _.times(ASSERTIONS, () => {
    const thing = fn()
    if (Array.isArray(thing)) counters.array += 1
    else if (typeof thing === 'boolean') counters.boolean += 1
    else if (typeof thing === 'function') counters.function += 1
    else if (typeof thing === 'number') {
      if (thing % 1 === 0) counters.integer += 1
      else counters.number += 1
    } else if (_.isObject(thing)) counters.object += 1
    else if (typeof thing === 'string') counters.string += 1
    else if (thing === null) counters.null += 1
    else if (thing === undefined) counters.undefined += 1
    else counters.other += 1
  })
}
/* eslint-enable no-param-reassign */

describe('anything', () => {
  it('returns anything', () => {
    const counters = makeCounters()
    runAssertions(counters, anything)

    expect(counters.array).toBeGreaterThan(0)
    expect(counters.boolean).toBeGreaterThan(0)
    expect(counters.function).toBeGreaterThan(0)
    expect(counters.integer).toBeGreaterThan(0)
    expect(counters.number).toBeGreaterThan(0)
    expect(counters.object).toBeGreaterThan(0)
    expect(counters.string).toBeGreaterThan(0)
    expect(counters.null).toBeGreaterThan(0)
    expect(counters.undefined).toBeGreaterThan(0)
    expect(counters.other).toBe(0)

    expect(Object.values(counters).reduce((acc, val) => acc + val, 0)).toBe(ASSERTIONS)
  })
})

describe('anything.but', () => {
  it('returns anything but specified types', () => {
    const counters = makeCounters()
    runAssertions(counters, () => anything.but('integer', Array))

    expect(counters.integer).toBe(0)
    expect(counters.array).toBe(0)
    expect(counters.boolean).toBeGreaterThan(0)
    expect(counters.function).toBeGreaterThan(0)
    expect(counters.number).toBeGreaterThan(0)
    expect(counters.object).toBeGreaterThan(0)
    expect(counters.string).toBeGreaterThan(0)
    expect(counters.null).toBeGreaterThan(0)
    expect(counters.undefined).toBeGreaterThan(0)
    expect(counters.other).toBe(0)

    expect(Object.values(counters).reduce((acc, val) => acc + val, 0)).toBe(ASSERTIONS)
  })
})

describe('anything.from', () => {
  it('returns anything from specified types', () => {
    const counters = makeCounters()
    runAssertions(counters, () => anything.from('integer', Array, Object, String))

    expect(counters.integer).toBeGreaterThan(0)
    expect(counters.array).toBeGreaterThan(0)
    expect(counters.boolean).toBe(0)
    expect(counters.function).toBe(0)
    expect(counters.number).toBe(0)
    expect(counters.object).toBeGreaterThan(0)
    expect(counters.string).toBeGreaterThan(0)
    expect(counters.null).toBe(0)
    expect(counters.undefined).toBe(0)
    expect(counters.other).toBe(0)

    expect(Object.values(counters).reduce((acc, val) => acc + val, 0)).toBe(ASSERTIONS)
  })
})
