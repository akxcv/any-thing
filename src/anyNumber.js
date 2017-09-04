// @flow

export type NumberOptions = {
  min?: number,
  max?: number,
}

const MIN = -1000000
const MAX = 1000000

export default function anyNumber (options: NumberOptions = {}) {
  const min = options.min === undefined ? MIN : options.min
  const max = options.max === undefined ? MAX : options.max
  return Math.random() * (max - min) + min
}
