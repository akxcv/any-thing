// @flow

import anyArray, { generateArray } from './anyArray'
import anyBoolean from './anyBoolean'
import anyFunction, { generateFunction } from './anyFunction'
import anyInteger from './anyInteger'
import anyNumber from './anyNumber'
import anyObject, { generateObject } from './anyObject'
import anyString from './anyString'

import type { ArrayOptions } from './anyArray'
/* no options for booleans */
import type { FunctionOptions } from './anyFunction'
import type { IntegerOptions } from './anyInteger'
import type { NumberOptions } from './anyNumber'
import type { ObjectOptions } from './anyObject'
import type { StringOptions } from './anyString'

export type Options = {
  array?: ArrayOptions,
  /* no options for booleans */
  function?: FunctionOptions,
  integer?: IntegerOptions,
  number?: NumberOptions,
  object?: ObjectOptions,
  string?: StringOptions,
  /* internal variables */
  __objectDepth?: number,
  __arrayDepth?: number,
  __functionDepth?: number,
}

const POSSIBILITIES = [Array, Boolean, Function, 'integer', Number, Object, String, null, undefined]

function anythingFrom (possibilities, options) {
  const type = possibilities[anyInteger({ min: 0, max: possibilities.length - 1 })]

  switch (type) {
    case Array:
      return generateArray(options.array, options.__arrayDepth, options)
    case Boolean:
      return anyBoolean()
    case Function:
      return generateFunction(options.function, options.__functionDepth, options)
    case 'integer':
      return anyInteger(options.integer)
    case Number:
      return anyNumber(options.number)
    case Object:
      return generateObject(options.object, options.__objectDepth, options)
    case String:
      return anyString(options.string)
    case null:
      return null
    case undefined:
      return undefined
  }
}

function anything (options: Options = {}) {
  return anythingFrom(POSSIBILITIES, options)
}

function parseArgs (args: Array<any>) {
  const maybeOptions = args[args.length - 1]
  const optionsGiven = typeof maybeOptions === 'object'
  const options = optionsGiven ? maybeOptions : {}
  const types = optionsGiven ? args.slice(0, -1) : args
  return [options, types]
}

anything.but = anything.except = (...args: Array<any>) => {
  const [options, exceptions] = parseArgs(args)
  return anythingFrom(POSSIBILITIES.filter(x => !exceptions.includes(x)), options)
}

anything.from = (...args: Array<any>) => {
  const [options, inclusions] = parseArgs(args)
  return anythingFrom(POSSIBILITIES.filter(x => inclusions.includes(x)), options)
}

export { anything, anyArray, anyBoolean, anyFunction, anyInteger, anyNumber, anyObject, anyString }
