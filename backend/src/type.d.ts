import { TokenPayload } from './models/requests/auth.requests'

declare module 'express' {
  interface Request {
    decode_authorization?: TokenPayload
    decode_refresh_token?: TokenPayload
  }
}
