// file này lưu hàm dùng để tạo ra 1 token
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { TokenPayload } from '~/models/requests/auth.requests'
export const signToken = async ({
  payload,
  privateKey,
  options = { algorithm: 'HS256' }
}: {
  payload: string | object | Buffer
  privateKey: string
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
// hàm giúp kiểm tra 1 token có đúng với chữ kí hay không,
// nếu đúng thì trả ra payload bên trong token đó
export const verifyToken = async ({ token, privateKey }: { token: string; privateKey: string }) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decode) => {
      if (error) {
        throw reject(error)
      } else {
        return resolve(decode as TokenPayload)
      }
    })
  })
}
