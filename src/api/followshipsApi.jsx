import axios from 'axios'

const followshipsURL =
  'https://fierce-plains-47262.herokuapp.com/api/followships'
// const followshipsURL =
//   'https://dry-anchorage-06913.herokuapp.com/api/followships'
// const followshipsURL =
//   'https://d9de-223-136-148-157.jp.ngrok.io/api/followships'

const axiosInstance = axios.create({ baseURL: followshipsURL })

axiosInstance.interceptors.request.use((config) => {
  config.headers['ngrok-skip-browser-warning'] = 'any'
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
})

// 追蹤

export const followApi = async (id) => {
  try {
    const res = await axiosInstance.post(`${followshipsURL}`, { id })
    return res
  } catch (error) {
    console.error(error)
    console.error('[Follow Failed]: ', error)
    return error
  }
}

// 取消追蹤

export const unfollowApi = async (id) => {
  try {
    const res = await axiosInstance.delete(`${followshipsURL}/${id}}`, { id })
    return res
  } catch (error) {
    console.error(error)
    console.error('[Unfollow Failed]: ', error)
    return error
  }
}
