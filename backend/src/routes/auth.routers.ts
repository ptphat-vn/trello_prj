import express from 'express'
import { loginController, logoutController, registerController } from '~/controllers/auth.controllers'
import {
  accessTokenValidators,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/auth.middlewares'
import { wrapAsync } from '~/utils/handlers'

// tạo user route

const authRouter = express.Router()

/*
desc: Register a new user
path: /register,
method: post
body: {
    name:string,
    email: string,
    password: string,
    confirm_password: string,
    date_of_birth: string có cấu trúc ISO8601
}
*/
// khi server bị lỗi thì chỉ có sài throw thôi chứ không sài được next

authRouter.post('/register', registerValidator, wrapAsync(registerController))

/*
desc: Login user
path: /login,
method: post
body: {
    email: string,
    password: string
}
 */

authRouter.post('/login', loginValidator, wrapAsync(loginController))

/*
desc: Logout user,
path: /logout,
method: post,
headers: {
    Authorization: 'Bearer <access_token>'
},
body: {
refresh_token: string}
*/
authRouter.post('/logout', accessTokenValidators, refreshTokenValidator, wrapAsync(logoutController))
export default authRouter
