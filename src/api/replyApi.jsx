import axios from 'axios'

const replyURL = 'https://fierce-plains-47262.herokuapp.com/api/tweets'

const axiosInstance = axios.create({ baseURL: replyURL })

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 新增回覆

// 取得單一推文的回覆

export const replyGetFromOneTweet = async (tweet_id) => {
  try {
    const res = await axiosInstance.get(`${replyURL}/${tweet_id}/replies`)
    return res
  } catch (error) {
    console.error('[User Get From One Tweet Failed]: ', error)
    return error
  }
}