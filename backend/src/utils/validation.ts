// Viết hàm validate nhận vào checkSchema
// Hàm này sẽ trả ra middleware để xử lí lỗi
// ai gọi validate(checkSchema) thì nhận được middleware

import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req) // ghi lỗi vô req
    const errors = validationResult(req) //lấy lỗi trong req
    if (errors.isEmpty()) {
      return next()
    } else {
      res.status(422).json({
        message: 'Invalid values',
        errors: errors.mapped()
      })
    }
  }
}
