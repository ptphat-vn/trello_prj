// import các interface của express giúp mô tả
import { NextFunction, Request, Response } from 'express'

// middleware bản thân nó là handler, có nhiệm vụ kiểm tra các dữ liệu mà người dùng
// gửi lên thông qua request
// Middlewares đảm nhận vai trò kiểm tra dữ liệu đủ và đúng kiểu

// Bây giờ mình sẽ mô phỏng chức năng đăng nhập
// nếu 1 người dùng muốn đăng nhập họ sẽ gửi lên mail và password
// thông qua req.body

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).json({
      error: 'Missing email or password!!'
    })
  } else {
    next()
  }
}
// không cùng tên thì không cần export default
