// controller cũng chỉ là handler có nhiệm vụ tập kết dữ liệu từ người dùng
// và phân phát vào các services đúng chổ

import { NextFunction, Request, Response } from 'express'
import { LoginReqBody, RegisterReqBody } from '~/models/requests/auth.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import authService from '~/services/auth.services'
import HTTP_STATUS from '~/constants/httpStatus'
import { AUTH_MESSAGE } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'

// controller là nơi tập kết và xử lí logic cho các dữ liệu nhận được
// trong controller các dữ liệu đều phải clean

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body

  const isDup = await authService.checkEmailExist(email)
  if (isDup) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      message: AUTH_MESSAGE.EMAIL_ALREADY_EXISTS
    })
  }
  const result = await authService.register(req.body)
  console.log(result)
  res.status(HTTP_STATUS.CREATED).json({
    message: AUTH_MESSAGE.REGISTER_SUCCESSFULLY,
    data: result
  })
}

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
  next: NextFunction
) => {
  // cần lấy email, password để tìm xem user nào đang sở hữu
  // nếu không có thì user nào ngừng cuộc chơi,
  // nếu có thì tạo accessToken và refreshToken trả về cho user
  const { email, password } = req.body
  const result = await authService.login({ email, password })
  res.status(HTTP_STATUS.OK).json({
    message: AUTH_MESSAGE.LOGIN_SUCCESSFULLY,
    data: result
  })
}
