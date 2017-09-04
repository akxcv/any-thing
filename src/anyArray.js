// @flow

import defaultValue from './defaultValue'
import anyInteger from './anyInteger'
import { anything } from './'

import type { Options } from './'

export type ArrayOptions = {
  minLength?: number,
  maxLength?: number,
  maxDepth?: number,
}

const MIN_LENGTH = 0
const MAX_LENGTH = 10
const MAX_DEPTH = 3

export function generateArray (
  options: ArrayOptions = {},
  depth: number = 0,
  __internalFullOptions: Options = {}
) {
  const minLength = Math.max(defaultValue(options.minLength, MIN_LENGTH), 0)
  const maxLength = Math.max(defaultValue(options.maxLength, MAX_LENGTH), 0)
  const maxDepth = Math.max(defaultValue(options.maxDepth, MAX_DEPTH), 1)

  const length = anyInteger({ min: minLength, max: maxLength })
  if (depth >= maxDepth) return anything.but(Array, __internalFullOptions)
  const result = []

  for (let i = 0; i < length; i += 1) {
    const newOptions = { ...__internalFullOptions, array: options, __arrayDepth: depth + 1 }
    const value = anything(newOptions)
    result.push(value)
  }

  return result
}

export default function anyArray (options: ArrayOptions = {}) {
  return generateArray(options)
}
