// import các interface của express giúp mô tả
import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { AUTH_MESSAGE } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'
import { validate } from '~/utils/validation'

// middleware bản thân nó là handler, có nhiệm vụ kiểm tra các dữ liệu mà người dùng
// gửi lên thông qua request
// Middlewares đảm nhận vai trò kiểm tra dữ liệu đủ và đúng kiểu

// Bây giờ mình sẽ mô phỏng chức năng đăng nhập
// nếu 1 người dùng muốn đăng nhập họ sẽ gửi lên mail và password
// thông qua req.body

// export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.body)
//   const { email, password } = req.body
//   if (!email || !password) {
//     return res.status(422).json({
//       error: 'Missing email or password!!'
//     })
//   } else {
//     next()
//   }
// }
// không cùng tên thì không cần export default

export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: AUTH_MESSAGE.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: AUTH_MESSAGE.NAME_MUST_BE_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: AUTH_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_100
        }
      },
      email: {
        notEmpty: {
          errorMessage: AUTH_MESSAGE.EMAIL_IS_REQUIRED
        },
        isEmail: true,
        trim: true
      },
      password: {
        notEmpty: {
          errorMessage: AUTH_MESSAGE.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: AUTH_MESSAGE.PASSWORD_MUSHT_BE_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: AUTH_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 1,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: AUTH_MESSAGE.PASSWORD_MUST_BE_STRONG
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: AUTH_MESSAGE.CONFIM_PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: AUTH_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: AUTH_MESSAGE.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 1,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: AUTH_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRONG
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              //value là confirm_password
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: AUTH_MESSAGE.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD
              })
            }
            return true
          }
        }
      },
      date_of_birth: {
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true
          },
          errorMessage: AUTH_MESSAGE.DATE_OF_BIRTH_BE_ISO8601
        }
      }
    },
    ['body']
  )
)

// viết hàm kiểm tra các loginReqBody
export const loginValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: AUTH_MESSAGE.EMAIL_IS_REQUIRED
        },
        isEmail: true,
        trim: true
      },
      password: {
        notEmpty: {
          errorMessage: AUTH_MESSAGE.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: AUTH_MESSAGE.PASSWORD_MUSHT_BE_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: AUTH_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 1,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: AUTH_MESSAGE.PASSWORD_MUST_BE_STRONG
        }
      }
    },
    ['body']
  )
)
