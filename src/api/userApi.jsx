import axios from 'axios'

const userURL = 'https://lit-earth-68562.herokuapp.com/api/users'

const axiosInstance = axios.create({ baseURL: userURL })

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
})

// OK
export const userSignupApi = async (payload) => {
  const { name, account, email, password, checkPassword } = payload
  try {
    const res = await axiosInstance.post(`${userURL}`, {
      name,
      account,
      email,
      password,
      checkPassword,
    })
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
    const res = await axiosInstance.post(`${userURL}/login`, {
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

// 取得個別使用者的推文 OK
export const userGetTweetsApi = async (id, page) => {
  try {
    const res = await axiosInstance.get(`${userURL}/${id}/tweets?page=${page}`)
    return res
  } catch (error) {
    console.error('[User Get Tweets Failed]: ', error)
    return error
  }
}

// 取得個別使用者的回覆 OK
export const userGetReplysApi = async (id, page) => {
  try {
    const res = await axiosInstance.get(
      `${userURL}/${id}/replied_tweets?page=${page}`
    )
    return res
  } catch (error) {
    console.error('[User Get Replys Failed]: ', error)
    return error
  }
}

// 取得個別使用者點過 like 的推文
export const userGetLikesApi = async (id, page) => {
  try {
    const res = await axiosInstance.get(`${userURL}/${id}/likes?page=${page}`)
    return res
  } catch (error) {
    console.error('[User Get Likes Failed]: ', error)
    return error
  }
}

// 取得個別使用者跟隨中的人

export const userGetFollowingsApi = async (id) => {
  try {
    const res = await axiosInstance.get(`${userURL}/${id}/followings`)
    return res
  } catch (error) {
    console.error('[User Get Followings Failed]: ', error)
    return error
  }
}

// 取得個別使用者的跟隨者

export const userGetFollowersApi = async (id) => {
  try {
    const res = await axiosInstance.get(`${userURL}/${id}/followers`)
    return res
  } catch (error) {
    console.error('[User Get Followers Failed]: ', error)
    return error
  }
}

// 取得追隨者前10的使用者

export const userGetTopUsersApi = async () => {
  try {
    const res = await axiosInstance.get(`${userURL}/topUsers`)
    return res
  } catch (error) {
    console.error('[User Get Top Users Failed]: ', error)
    return error
  }
}

// 編輯自己的資料
export const editProfileApi = async (user_id, formData) => {
  try {
    const res = axiosInstance({
      method: 'put',
      baseURL: userURL,
      url: '/' + user_id,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res
  } catch (error) {
    console.error(error)
    return error
  }
}
// 編輯自己的帳號設定

export const userPutSettingApi = async (payload) => {
  const { account, name, email, password, checkPassword, id } = payload
  try {
    const res = await axiosInstance.put(`${userURL}/${id}/setting`, {
      name,
      account,
      email,
      password,
      checkPassword,
    })
    return res
  } catch (error) {
    console.error('[User Put Setting Failed]: ', error)
    return error
  }
}
