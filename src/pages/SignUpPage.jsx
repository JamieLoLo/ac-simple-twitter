import styles from './SignUpPage.module.scss'
// --- hook
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// --- component
import { Button, AuthInput, Notification } from '../UI/index'
// --- api
import { userSignupApi } from '../api/userApi'
// --- store
import { authInputActions } from '../store/authInput-slice'
// --- icons
import { logoIcon } from '../components/assets/icons/index'

const SignUpPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // --- localStorage
  const authToken = localStorage.getItem('authToken')
  // --- useState
  const [loadingStatus, setLoadingStatus] = useState('finish')
  const [errorMessage, setErrorMessage] = useState('')
  // --- useSelector
  let account = useSelector((state) => state.authInput.account)
  let name = useSelector((state) => state.authInput.username)
  let email = useSelector((state) => state.authInput.email)
  let password = useSelector((state) => state.authInput.password)
  let checkPassword = useSelector((state) => state.authInput.passwordCheck)

  // useEffect
  useEffect(() => {
    if (authToken !== null) {
      navigate('/users/main')
    }
  }, [authToken, navigate])

  useEffect(() => {
    if (loadingStatus === 'failed' || loadingStatus === 'success') {
      setTimeout(() => {
        if (loadingStatus === 'success') {
          setLoadingStatus('finish')
          navigate('/users/main')
        } else {
          setLoadingStatus('finish')
        }
      }, 1000)
    }
  }, [loadingStatus, navigate])

  // event Handler
  const accountHandler = (useInput) => {
    dispatch(authInputActions.accountAuth(useInput))
  }
  const usernameHandler = (useInput) => {
    dispatch(authInputActions.usernameAuth(useInput))
  }
  const emailHandler = (useInput) => {
    dispatch(authInputActions.emailAuth(useInput))
  }
  const passwordHandler = (useInput) => {
    dispatch(authInputActions.passwordAuth(useInput))
  }
  const passwordCheckHandler = (useInput) => {
    dispatch(authInputActions.passwordCheckAuth(useInput))
  }
  const userSignupHandler = async () => {
    try {
      localStorage.clear()
      setLoadingStatus('start')
      const res = await userSignupApi({
        account: account.content,
        name: name.content,
        email: email.content,
        password: password.content,
        checkPassword: checkPassword.content,
      })

      if (res.status !== 200) {
        setLoadingStatus('failed')
        setErrorMessage(res.response.data.message)
        return
      }
      const { data } = res
      const { token, user } = data

      localStorage.setItem('authToken', token)
      localStorage.setItem('userId', user.id)
      setLoadingStatus('success')
    } catch (error) {
      console.error(error)
    }
  }

  // "Error: 已經註冊過的帳號,Error: 已經註冊過的email"
  // "Error: 已經註冊過的帳號"
  // "Error: 已經註冊過的email"
  const refreshHandler = () => {
    dispatch(authInputActions.refreshAuthInput())
  }

  return (
    <>
      <div className={styles.notification__container}>
        {loadingStatus === 'failed' &&
          errorMessage ===
            'Error: 已經註冊過的帳號,Error: 已經註冊過的email' && (
            <Notification
              notification='error'
              title='account 與 email 已重複註冊'
            />
          )}
        {loadingStatus === 'failed' &&
          errorMessage === 'Error: 已經註冊過的帳號' && (
            <Notification notification='error' title='account 已重複註冊' />
          )}
        {loadingStatus === 'failed' &&
          errorMessage === 'Error: 已經註冊過的email' && (
            <Notification notification='error' title='email 已重複註冊' />
          )}
        {loadingStatus === 'success' && (
          <Notification notification='success' title='註冊成功' />
        )}
      </div>
      <div className={styles.form__container}>
        <div className={styles.logo}>
          <img src={logoIcon} alt='logo' />
        </div>
        <h3>建立你的帳號</h3>
        <AuthInput
          label='帳號'
          placeholder='請輸入帳號'
          onChange={accountHandler}
          value={account.content}
          isValid={account.isValid}
          message={account.message}
          count={account.count}
          upperLimit='30'
        />
        <AuthInput
          label='名稱'
          placeholder='請輸入使用者名稱'
          onChange={usernameHandler}
          value={name.content}
          isValid={name.isValid}
          message={name.message}
          count={name.count}
          upperLimit='50'
        />
        <AuthInput
          label='Email'
          placeholder='請輸入 Email'
          onChange={emailHandler}
          value={email.content}
          isValid={email.isValid}
          message={email.message}
        />
        <AuthInput
          label='密碼'
          placeholder='請設定密碼'
          type='password'
          onChange={passwordHandler}
          value={password.content}
          isValid={password.isValid}
          message={password.message}
          count={password.count}
          upperLimit='30'
        />
        <AuthInput
          label='密碼確認'
          placeholder='請再度輸入密碼'
          type='password'
          onChange={passwordCheckHandler}
          value={checkPassword.content}
          isValid={checkPassword.isValid}
          message={checkPassword.message}
        />
        <div className={styles.button__container}>
          <Button
            className='button button__xl active'
            title='註冊'
            style={{ width: '356px' }}
            onClick={userSignupHandler}
          />
        </div>
        <div className={styles.button__switch}>
          <Link to='/users/login'>
            <Button
              className='button linkButton'
              title='取消'
              onClick={refreshHandler}
            />
          </Link>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
