import axios from 'axios'

const likeURL = 'https://fierce-plains-47262.herokuapp.com/api/tweets'

const axiosInstance = axios.create({ baseURL: likeURL })

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})
// 喜歡一則推文tweets/504/like
export const likeApi = async (tweet_id) => {
  try {
    const res = await axiosInstance.post(`${likeURL}/${tweet_id}/like`)
    return res
  } catch (error) {
    console.error(error)
    console.error('[Like Failed]: ', error)
    return error
  }
}

// 取消喜歡一則推文
export const unLikeApi = async (tweet_id) => {
  try {
    const res = await axiosInstance.post(`${likeURL}/${tweet_id}/unlike`)
    return res
  } catch (error) {
    console.error(error)
    console.error('[unLike Failed]: ', error)
    return error
  }
}
