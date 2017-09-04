// @flow

import defaultValue from './defaultValue'
import anyInteger from './anyInteger'
import anyString from './anyString'
import { anything } from './'

import type { Alphabet } from './anyString'
import type { Options } from './'

export type ObjectOptions = {
  minLength?: number,
  maxLength?: number,
  maxDepth?: number,
  minStringLength?: number,
  maxStringLength?: number,
  alphabet?: Alphabet,
}

const MIN_LENGTH = 0
const MAX_LENGTH = 10
const MAX_DEPTH = 3
const MIN_STRING_LENGTH = 1
const MAX_STRING_LENGTH = 20

export function generateObject (
  options: ObjectOptions = {},
  depth: number = 0,
  __internalFullOptions: Options = {}
) {
  const minLength = Math.max(defaultValue(options.minLength, MIN_LENGTH), 0)
  const maxLength = Math.max(defaultValue(options.maxLength, MAX_LENGTH), 0)
  const maxDepth = Math.max(defaultValue(options.maxDepth, MAX_DEPTH), 1)
  const minStringLength = Math.max(defaultValue(options.minStringLength, MIN_STRING_LENGTH), 0)
  const maxStringLength = Math.max(defaultValue(options.maxStringLength, MAX_STRING_LENGTH), 0)
  const { alphabet } = options

  if (depth >= maxDepth) return anything.but(Object, __internalFullOptions)

  const length = anyInteger({ min: minLength, max: maxLength })
  const result = {}

  for (let i = 0; i < length; i += 1) {
    const key = anyString({
      minLength: minStringLength,
      maxLength: maxStringLength,
      alphabet,
    })
    /**
     * should happen pretty rarily, easiest way to guarantee desired object size
     * is to just decrement i
     */
    if (Object.keys(result).includes(key)) i -= 1
    const newOptions = { ...__internalFullOptions, object: options, __objectDepth: depth + 1 }
    const value = anything(newOptions)
    result[key] = value
  }

  return result
}

export default function anyObject (options: ObjectOptions = {}) {
  return generateObject(options)
}
