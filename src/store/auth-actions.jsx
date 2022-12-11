import { signupApi } from '../api/authApi'
import * as jwt from 'jsonwebtoken'
import { authActions } from './auth-slice'

export const signup = (data) => {
  return async (dispatch) => {
    console.log(data)
    try {
      await signupApi({
        name: data.name,
        account: data.account,
        email: data.email,
        password: data.password,
        checkPassword: data.checkPassword,
      })
    } catch (error) {
      console.error('[Signup Action Error]:', error)
    }
  }
}
