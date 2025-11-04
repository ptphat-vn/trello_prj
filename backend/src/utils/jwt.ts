// file này lưu hàm dùng để tạo ra 1 token
import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const signToken = async ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = { algorithm: 'HS256' }
}: {
  payload: string | object | Buffer
  privateKey?: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error) // có lỗi thì trả về lỗi
      } else {
        return resolve(token as string) // không lỗi trả về token
      }
    })
  })
}
