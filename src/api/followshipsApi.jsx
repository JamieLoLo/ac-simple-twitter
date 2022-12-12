import axios from 'axios'

const followshipsURL = 'https://fierce-plains-47262.herokuapp.com/api/followships'

const axiosInstance = axios.create({ baseURL: followshipsURL })

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 追蹤

// 取消追蹤
