// @flow

import defaultValue from './defaultValue'
import { anything } from './'

import type { Options } from './'

export type FunctionOptions = {
  maxDepth?: number,
}

const MAX_DEPTH = 3

export function generateFunction (
  options: FunctionOptions = {},
  depth: number = 0,
  __internalFullOptions: Options = {}
) {
  const maxDepth = Math.max(defaultValue(options.maxDepth, MAX_DEPTH), 1)
  if (depth >= maxDepth) return anything.but(Function, __internalFullOptions)
  const newOptions = { ...__internalFullOptions, function: options, __functionDepth: depth + 1 }
  const value = anything(newOptions)
  return () => value
}

export default function anyFunction (options: FunctionOptions = {}) {
  return generateFunction(options)
}
