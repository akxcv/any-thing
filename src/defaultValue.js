// @flow

export default function defaultValue (first: any, second: any) {
  return first === undefined ? second : first
}
