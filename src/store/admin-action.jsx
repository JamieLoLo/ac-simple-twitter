import {
  adminGetAllTweetsApi,
  adminGetAllUsersApi,
  adminLoginApi,
} from '../api/adminApi'

export const adminLogin = (data) => {
  return async (dispatch) => {
    try {
      const response = await adminLoginApi({
        account: data.account,
        password: data.password,
      })
      return response
    } catch (error) {
      console.error(`[Error is ${error}]`)
    }
  }
}
