// Viết hàm validate nhận vào checkSchema
// Hàm này sẽ trả ra middleware để xử lí lỗi
// ai gọi validate(checkSchema) thì nhận được middleware

import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Error'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req) // ghi lỗi vô req
    const errors = validationResult(req) //lấy lỗi trong req
    if (errors.isEmpty()) {
      return next()
    } else {
      const errorObject = errors.mapped()
      const entityError = new EntityError({ errors: {} })
      for (const key in errorObject) {
        const { msg } = errorObject[key]
        if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
          return next(msg)
        }
        entityError.errors[key] = msg
      }
      next(entityError)
    }
  }
}
