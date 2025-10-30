// controller cũng chỉ là handler có nhiệm vụ tập kết dữ liệu từ người dùng
// và phân phát vào các services đúng chổ

import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import authService from '~/services/auth.services'
import databaseService from '~/services/database.services'

// controller là nơi tập kết và xử lí logic cho các dữ liệu nhận được
// trong controller các dữ liệu đều phải clean

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'tanphatphan091@gmail.com' && password === 'user123') {
    res.json({
      data: {
        fname: 'Phat',
        yob: 2004
      }
    })
  } else {
    res.status(400).json({
      error: 'Invalid email or password!!'
    })
  }
}

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await authService.register({ email, password })
    console.log(result)
    return res.status(200).json({
      message: 'User registered successfully',
      result: result
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Error registering user',
      err: err
    })
  }
}
