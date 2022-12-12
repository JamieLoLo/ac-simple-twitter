import axios from 'axios'

const userURL = 'https://fierce-plains-47262.herokuapp.com/api/users'

const axiosInstance = axios.create({ baseURL: userURL })

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.header['Authorization'] = `Bearer ${token}`
  }
  return config
})

export const userSignupApi = async (payload) => {
  if (payload) {
    const { name, account, email, password, checkPassword } = payload
    try {
      const { data } = await axios.post(`${userURL}`, {
        name,
        account,
        email,
        password,
        checkPassword,
      })
      console.log(data)
      const { status } = data
      if (status === 'success') {
        return { ...data }
      }
      return data
    } catch (error) {
      console.error('[User Signup Failed]: ', error)
    }
  }
}

export const userLoginApi = async (payload) => {
  if (payload) {
    const { account, password } = payload
    try {
      const { data } = await axios.post(`${userURL}/login`, {
        account,
        password,
      })
      console.log(data)
      const { status } = data
      if (status === 'success') {
        return { data }
      }
      return data
    } catch (error) {
      console.error('[User Login Failed]: ', error)
    }
  }
}

export const userGetProfileApi = async () => {
  try {
    const res = await axiosInstance.get(`${userURL}/:id`)
    return [...res]
  } catch (error) {
    console.error('[User Get Profile Failed]: ', error)
  }
}
