import express from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'

// tạo user route

const authRouter = express.Router()

authRouter.post('/login', loginValidator, loginController)

authRouter.post('/register', registerController)

export default authRouter
