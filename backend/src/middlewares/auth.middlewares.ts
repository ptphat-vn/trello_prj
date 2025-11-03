// import các interface của express giúp mô tả
import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'

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

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: 'Name is required'
      },
      isString: {
        errorMessage: 'Name must be a string'
      },
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        },
        errorMessage: 'Name must be between 1 and 100 characters'
      }
    },
    email: {
      notEmpty: {
        errorMessage: 'Email is required'
      },
      isEmail: true,
      trim: true
    },
    password: {
      notEmpty: {
        errorMessage: 'Password is required'
      },
      isString: {
        errorMessage: 'Password must be a string'
      },
      isLength: {
        options: {
          min: 8,
          max: 50
        },
        errorMessage: 'Password must be between 8 and 50 characters'
      },
      isStrongPassword: {
        options: {
          minLength: 1,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage: 'Password must be at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol'
      }
    },
    confirm_password: {
      notEmpty: {
        errorMessage: 'Confirm Password is required'
      },
      isString: {
        errorMessage: 'Confirm Password must be a string'
      },
      isLength: {
        options: {
          min: 8,
          max: 50
        },
        errorMessage: 'Confirm Password must be between 8 and 50 characters'
      },
      isStrongPassword: {
        options: {
          minLength: 1,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage: 'Confirm Password must be at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol'
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            //value là confirm_password
            throw new Error('Confirm Password does not match Password')
          } else {
            return true
          }
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        },
        errorMessage: 'Date of Birth must be a valid ISO8601 date'
      }
    }
  })
)
