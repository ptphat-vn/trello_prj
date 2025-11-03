// controller cũng chỉ là handler có nhiệm vụ tập kết dữ liệu từ người dùng
// và phân phát vào các services đúng chổ

import { Request, Response } from 'express'
import { RegisterReqBody } from '~/models/requests/auth.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import authService from '~/services/auth.services'

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

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const { email } = req.body
  try {
    const isDup = await authService.checkEmailExist(email)
    if (isDup) {
      const customError = new Error('Email already in use')
      Object.defineProperty(customError, 'message', {
        enumerable: true
      })
      throw customError
    }
    const result = await authService.register(req.body)
    console.log(result)
    return res.status(200).json({
      message: 'User registered successfully',
      result: result
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Error registering user',
      error: err
    })
  }
}
