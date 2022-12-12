import { userSignupApi } from '../api/userApi'

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
