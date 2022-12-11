import axios from 'axios'

const adminURL = 'https://fierce-plains-47262.herokuapp.com/api/admin'

const axiosInstance = axios.create({ baseURL: adminURL })

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.header['Authorization'] = `Bearer ${token}`
  }
  return config
})

export const adminGetAllUsersApi = async () => {
  try {
    const res = await axiosInstance.get(`${adminURL}/users`)
    return [...res]
  } catch (error) {
    console.error('[Admin Get All Users Failed]: ', error)
  }
}

export const adminGetAllTweetsApi = async () => {
  try {
    const res = await axiosInstance.get(`${adminURL}/tweets`)
    return [...res]
  } catch (error) {
    console.error('[Admin Get All Tweets Failed]: ', error)
  }
}

export const adminLoginApi = async (payload) => {
  if (payload) {
    const { account, password } = payload
    try {
      const { data } = await axios.post(`${adminURL}/login`, {
        account,
        password,
      })
      console.log(data)
      const { status } = data
      if (status === 'success') {
        return { ...data }
      }
      return data
    } catch (error) {
      console.error('[Admin Login Failed]: ', error)
    }
  }
}
