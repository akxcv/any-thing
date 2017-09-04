// @flow

import anyInteger from './anyInteger'
import defaultValue from './defaultValue'

export type Alphabet = string | Array<string>

export type StringOptions = {
  minLength?: number,
  maxLength?: number,
  alphabet?: Alphabet,
}

const MIN_LENGTH = 0
const MAX_LENGTH = 10
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export default function anyString (options: StringOptions = {}) {
  const minLength = Math.max(defaultValue(options.minLength, MIN_LENGTH), 0)
  const maxLength = Math.max(defaultValue(options.maxLength, MAX_LENGTH), 0)
  const alphabet = defaultValue(options.alphabet, ALPHABET)

  const allowedCharString: string = Array.isArray(alphabet) ? alphabet.join('') : alphabet
  const length = anyInteger({ min: minLength, max: maxLength })

  let result = ''
  for (let i = 0; i < length; i += 1) {
    result += allowedCharString.charAt(Math.floor(Math.random() * allowedCharString.length))
  }

  return result
}
