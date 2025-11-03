import express from 'express'
import { loginController, registerController } from '~/controllers/auth.controllers'
import { loginValidator, registerValidator } from '~/middlewares/auth.middlewares'

// tạo user route

const authRouter = express.Router()

authRouter.post('/login', loginValidator, loginController)

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

authRouter.post('/register', registerValidator, registerController)

export default authRouter
