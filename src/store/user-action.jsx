import { userSignupApi, userLoginApi } from '../api/userApi'
import * as jwt from 'jsonwebtoken'
import { userActions } from './user-slice'

export const userSignup = (data) => {
  return async (dispatch) => {
    try {
      const response = await userSignupApi({
        name: data.name,
        account: data.account,
        email: data.email,
        password: data.password,
        checkPassword: data.checkPassword,
      })
      return response
    } catch (error) {
      console.error(`[Error is ${error}]`)
    }
  }
}

export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      const { token, user } = await userLoginApi({
        account: data.account,
        password: data.password,
      })
      const tempPayload = jwt.decode(token)
      if (tempPayload) {
        dispatch(
          userActions.changePayload({
            payload: tempPayload,
          })
        )
        dispatch(
          userActions.changeIsAuthenticated({
            IsAuthenticated: true,
          })
        )
        localStorage.setItem('token', token)
      } else {
        dispatch(
          userActions.changePayload({
            payload: null,
          })
        )
        dispatch(
          userActions.changeIsAuthenticated({
            IsAuthenticated: false,
          })
        )
      }
      return { token, user }
    } catch (error) {
      console.error(`[Error is ${error}]`)
    }
  }
}
