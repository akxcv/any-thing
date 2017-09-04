// @flow

import anyInteger from './anyInteger'

export default function anyBoolean () {
  return anyInteger({ min: 0, max: 1 }) === 1
}
