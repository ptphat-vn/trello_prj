import HTTP_STATUS from '~/constants/httpStatus'
import { AUTH_MESSAGE } from '~/constants/message'

export class ErrorWithStatus {
  status: number
  message: string
  constructor({ status, message }: { status: number; message: string }) {
    this.status = status
    this.message = message
  }
}
type ErrorsType = Record<string, { msg: string; [key: string]: any } | string>
export class EntityError extends ErrorWithStatus {
  errors: ErrorsType
  constructor({ message = AUTH_MESSAGE.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
