// @flow

export type IntegerOptions = {
  min?: number,
  max?: number,
}

const MIN_INT = -1000000
const MAX_INT = 1000000

export default function anyInteger (options: IntegerOptions = {}) {
  const min = options.min === undefined ? MIN_INT : Math.ceil(options.min)
  const max = options.max === undefined ? MAX_INT : Math.floor(options.max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
