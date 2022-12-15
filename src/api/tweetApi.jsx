import axios from 'axios'

// const tweetURL = 'https://fierce-plains-47262.herokuapp.com/api/tweets'
// const tweetURL = 'https://dry-anchorage-06913.herokuapp.com/api/tweets'
const tweetURL = 'https://47dc-223-136-148-157.jp.ngrok.io/api/tweets'

const axiosInstance = axios.create({ baseURL: tweetURL })

axiosInstance.interceptors.request.use((config) => {
  config.headers['ngrok-skip-browser-warning'] = 'any'
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 新增推文
export const tweetPostApi = async (description) => {
  try {
    const res = await axiosInstance.post(tweetURL, {
      description,
    })
    return res
  } catch (error) {
    console.error(error)
    console.error('[Add Tweet Failed]: ', error)
    return error
  }
}

// 取得所有推文
export const tweetGetAllApi = async () => {
  try {
    const res = await axiosInstance.get(`${tweetURL}`)
    return res
  } catch (error) {
    console.error(['[Tweet Get All Failed]: ', error])
    return error
  }
}

// 取得單一推文
export const tweetGetOneApi = async (tweet_id) => {
  try {
    const res = await axiosInstance.get(`${tweetURL}/${tweet_id}`)
    return res
  } catch (error) {
    console.error(['[Tweet Get One Failed]: ', error])
    return error
  }
}

// 取得單一推文回覆
export const replyGetOneApi = async (tweet_id) => {
  try {
    const res = await axiosInstance.get(`${tweetURL}/${tweet_id}/replies`)
    return res
  } catch (error) {
    console.error(['[Reply Get One Failed]: ', error])
    return error
  }
}
