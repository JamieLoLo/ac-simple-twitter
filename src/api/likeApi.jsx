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
// 喜歡一則推文


// 取消喜歡一則推文

