import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/auth.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/signToken'
import { TokenType } from '~/constants/enums'
import 'dotenv/config'
class AuthServices {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN as string }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.RefreshToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN as string }
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
    return result
  }
}

const authService = new AuthServices()
export default authService
