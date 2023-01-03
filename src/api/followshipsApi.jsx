import axios from 'axios'

const followshipsURL = 'https://lit-earth-68562.herokuapp.com/api/followships'

const axiosInstance = axios.create({ baseURL: followshipsURL })

axiosInstance.interceptors.request.use((config) => {
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
