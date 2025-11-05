import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/auth.requests'
import { hashPassword } from '~/utils/crypto'
import { TokenType } from '~/constants/enums'
import 'dotenv/config'
import { signToken } from '~/utils/jwt'
import { ErrorWithStatus } from '~/models/Error'
import HTTP_STATUS from '~/constants/httpStatus'
import { AUTH_MESSAGE } from '~/constants/message'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
class AuthServices {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.RefreshToken },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN }
    })
  }
  async checkEmailExist(email: string) {
    // dùng email lên db tìm user sở hữu email đó
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        password: hashPassword(payload.password),
        date_of_birth: new Date(payload.date_of_birth)
      })
    )
    const user_id = result.insertedId.toString()
    // tạo access token và refresh token
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    return { access_token, refresh_token }
  }
  async login({ email, password }: { email: string; password: string }) {
    const user = await databaseService.users.findOne({ email, password: hashPassword(password) })
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        message: AUTH_MESSAGE.INVALID_EMAIL_OR_PASSWORD
      })
    }
    // nếu có thì user thì tạo accessToken và refreshToken trả về cho user
    const user_id = user._id.toString()
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    // lưu refresh token lại vào DB
    await databaseService.refresh_tokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    return { access_token, refresh_token }
  }

  async checkRefreshToken({ user_id, refresh_token }: { user_id: string; refresh_token: string }) {
    const refreshToken = await databaseService.refresh_tokens.findOne({
      token: refresh_token,
      user_id: new ObjectId(user_id)
    })
    console.log(refreshToken)

    if (!refreshToken) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: AUTH_MESSAGE.REFRESH_TOKEN_INVALID
      })
    }
    // nếu mà trùng rồi thì mình xem thử refresh_token có được quyền truy cập dịch vụ không
    return refreshToken
  }
  async logout(refresh_token: string) {
    await databaseService.refresh_tokens.deleteOne({ token: refresh_token })
    return {
      message: AUTH_MESSAGE.LOGOUT_SUCCESSFULLY
    }
  }
}

const authService = new AuthServices()
export default authService
