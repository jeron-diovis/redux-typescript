import Messages from './messages'
import { DefaultValidationMessage, ErrorType } from './types'

function isMessageMissing(type: ErrorType, rule: unknown) {
  switch (type) {
    case 'required':
      return typeof rule === 'boolean'

    case 'min':
    case 'max':
    case 'minLength':
    case 'maxLength':
      return typeof rule === 'number'

    case 'pattern':
      return rule instanceof RegExp

    case 'validate':
      // validation func by definition returns an error message
      return false

    default:
      return false
  }
}

export function getDefaultMsg(
  type: ErrorType,
  rule: unknown,
  value: unknown
): string | undefined {
  if (isMessageMissing(type, rule)) {
    const defaultMsg = Messages[type] as DefaultValidationMessage
    return typeof defaultMsg === 'function'
      ? defaultMsg(rule, value)
      : defaultMsg
  }
  return undefined
}
