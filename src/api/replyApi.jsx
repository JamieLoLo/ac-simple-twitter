import axios from 'axios'

const replyURL = 'https://fierce-plains-47262.herokuapp.com/api/tweets'

const axiosInstance = axios.create({ baseURL: replyURL })

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
})

// 新增回覆
export const AddReplyApi = async (tweet_id, comment) => {
  try {
    const res = await axiosInstance.post(`${replyURL}/${tweet_id}/replies`, {
      comment,
    })
    return res
  } catch (error) {
    console.error(error)
    console.error('[Add Reply Failed]: ', error)
    return error
  }
}

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
