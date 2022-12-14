import axios from 'axios'

const likeURL = 'https://lit-earth-68562.herokuapp.com/api/tweets'

const axiosInstance = axios.create({ baseURL: likeURL })

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
})
// 喜歡一則推文
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
