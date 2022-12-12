import axios from 'axios'

const userURL = 'https://fierce-plains-47262.herokuapp.com/api/users'

const axiosInstance = axios.create({ baseURL: userURL })

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})


// OK
export const userSignupApi = async (payload) => {
  const { name, account, email, password, checkPassword } = payload
  try {
    const res = await axios.post(`${userURL}`, {
      name,
      account,
      email,
      password,
      checkPassword,
    })
    console.log(res)
    return res
  } catch (error) {
    console.error('[User Signup Failed]: ', error)
    return error
  }
}


// OK
export const userLoginApi = async (payload) => {
  const { account, password } = payload
  try {
    const res = await axios.post(`${userURL}/login`, {
      account,
      password,
    })
    return res
  } catch (error) {
    console.error('[User Login Failed]: ', error)
    return error
  }
}

// 取得個別使用者的資料 OK
export const userGetProfileApi = async (id) => {
  try {
    const res = await axiosInstance.get(`${userURL}/${id}`)
    return res
  } catch (error) {
    console.error('[User Get Profile Failed]: ', error)
    return error
  }
}

// 取得個別使用者的推文
export const userGetTweetsApi = async (id) => {
  try {
    const res = await axiosInstance.get(`${userURL}/${id}/tweets`)
    return res
  } catch (error) {
    console.error('[User Get Tweets Failed]: ', error)
    return error
  }
}

// 取得個別使用者的回覆

export const userGetReplysApi = async (id) => {
  try {
    const res = await axiosInstance.get(`${userURL}/${id}/replied_tweets`)
    return res
  } catch (error) {
    console.error('[User Get Replys Failed]: ', error)
    return error
  }
}

// 取得個別使用者點過 like 的推文 

export const userGetLikesApi = async (id) => {
  try {
    const res = await axiosInstance.get(`${userURL}/${id}/likes`)
    return res
  } catch (error) {
    console.error('[User Get Likes Failed]: ', error)
    return error
  }
}

// 取得個別使用者跟隨中的人

// 取得個別使用者的跟隨者

// 編輯自己的資料

// 編輯自己的帳號設定
