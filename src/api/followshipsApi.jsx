import axios from 'axios'

const followshipsURL =
  'https://fierce-plains-47262.herokuapp.com/api/followships'

const axiosInstance = axios.create({ baseURL: followshipsURL })

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
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
    console.log(res)
    return res
  } catch (error) {
    console.error(error)
    console.error('[Unfollow Failed]: ', error)
    return error
  }
}
