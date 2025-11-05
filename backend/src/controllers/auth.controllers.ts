// controller cũng chỉ là handler có nhiệm vụ tập kết dữ liệu từ người dùng
// và phân phát vào các services đúng chổ

import { NextFunction, Request, Response } from 'express'
import { LoginReqBody, LogoutReqBody, RegisterReqBody, TokenPayload } from '~/models/requests/auth.requests'
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

export const logoutController = async (
  req: Request<ParamsDictionary | any | LogoutReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { refresh_token } = req.body
  // xem thử user_id trong payload của refresh_token và access_token có giống không
  const { user_id: user_id_at } = req.decode_authorization as TokenPayload
  const { user_id: user_id_rf } = req.decode_refresh_token as TokenPayload
  if (user_id_at !== user_id_rf) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: AUTH_MESSAGE.REFRESH_TOKEN_INVALID
    })
  }
  await authService.checkRefreshToken({
    user_id: user_id_at,
    refresh_token
  })
  // nếu mà trùng rồi thì mình xem thử refresh_token có được quyền dùng dịch vụ hay không
  // khi nào mà có mã đó trong DB thì mới cho dùng dịch vụ
  await authService.logout(refresh_token)
  res.status(HTTP_STATUS.OK).json({
    message: AUTH_MESSAGE.LOGOUT_SUCCESSFULLY
  })
}
