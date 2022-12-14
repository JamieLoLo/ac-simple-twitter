import axios from 'axios'

const tweetURL = 'https://lit-earth-68562.herokuapp.com/api/tweets'

const axiosInstance = axios.create({ baseURL: tweetURL })

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
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
export const tweetGetAllApi = async (page) => {
  try {
    const res = await axiosInstance.get(`${tweetURL}?page=${page}`)
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
export const replyGetOneApi = async (tweet_id, page) => {
  try {
    const res = await axiosInstance.get(
      `${tweetURL}/${tweet_id}/replies?page=${page}`
    )
    return res
  } catch (error) {
    console.error(['[Reply Get One Failed]: ', error])
    return error
  }
}
