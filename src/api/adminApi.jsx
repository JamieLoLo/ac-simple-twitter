import axios from 'axios'

const adminURL = 'https://fierce-plains-47262.herokuapp.com/api/admin'
// const adminURL = 'https://dry-anchorage-06913.herokuapp.com/api/admin'
const adminURL = 'https://4b39-223-136-148-157.jp.ngrok.io/api/admin'


const axiosInstance = axios.create({ baseURL: adminURL })

axiosInstance.interceptors.request.use((config) => {
  config.headers['ngrok-skip-browser-warning'] = 'any'
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
})

export const AdminDeleteTweetApi = async (id) => {
  try {
    const res = await axiosInstance.delete(`${adminURL}/tweets/${id}`)
    return res
  } catch (error) {
    console.error('[Admin Delete Tweet Failed]: ', error)
  }
}

// OK
export const adminGetAllUsersApi = async (page) => {
  try {
    const res = await axiosInstance.get(`${adminURL}/users?page=${page}`)
    return res
  } catch (error) {
    console.error('[Admin Get All Users Failed]: ', error)
  }
}

// OK
export const adminGetAllTweetsApi = async (page) => {
  try {
    const res = await axiosInstance.get(`${adminURL}/tweets?page=${page}`)
    return res
  } catch (error) {
    console.error('[Admin Get All Tweets Failed]: ', error)
  }
}

// OK
export const adminLoginApi = async (payload) => {
  const { account, password } = payload
  try {
    const res = await axios.post(`${adminURL}/login`, {
      account,
      password,
    })
    return res
  } catch (error) {
    console.error('[Admin Login Failed]: ', error)
    return error
  }
}
