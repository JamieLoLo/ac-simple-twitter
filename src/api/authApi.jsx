import axios from 'axios'

const authURL = 'https://fierce-plains-47262.herokuapp.com/api'

export const signupApi = async ({
  name,
  account,
  email,
  password,
  checkPassword,
}) => {
  try {
    const { data } = await axios.post(`${authURL}/users`, {
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
    console.error('[Signup Failed]: ', error)
  }
}
