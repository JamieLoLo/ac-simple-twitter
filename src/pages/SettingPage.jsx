import styles from './SettingPage.module.scss'
// --- hook
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// --- component
import { AuthInput, Button, Notification } from '../UI/index'
import { UserGrid } from '../Layout/GridSystemWrapper'
// --- api
import { userPutSettingApi } from '../api/userApi'
// --- store
import { authInputActions } from '../store/authInput-slice'

const SettingPage = () => {
  const pathname = useLocation().pathname
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // --- localStorage
  const authToken = localStorage.getItem('authToken')
  // --- useState
  const [loadingStatus, setLoadingStatus] = useState('finish')
  const [errorMessage, setErrorMessage] = useState('')
  // --- useSelector
  const account = useSelector((state) => state.authInput.account)
  const username = useSelector((state) => state.authInput.username)
  const email = useSelector((state) => state.authInput.email)
  const password = useSelector((state) => state.authInput.password)
  const passwordCheck = useSelector((state) => state.authInput.passwordCheck)
  const userInfo = useSelector((state) => state.user.userInfo)

  // --- useEffect
  useEffect(() => {
    if (authToken === null) {
      navigate('/users/login')
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


  // --- event Handler
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

  // --- helper constant
  const saveSettingHandler = async () => {
    if (
      account.isValid &&
      username.isValid &&
      email.isValid &&
      password.isValid &&
      passwordCheck.isValid
    ) {
      try {
        const res = await userPutSettingApi({
          account: account.content,
          name: username.content,
          email: email.content,
          password: password.content,
          checkPassword: passwordCheck.content,
          id: userInfo.id,
        })
        if (res.status !== 200) {
          setLoadingStatus('failed')
          setErrorMessage(res.response.data.message)
          return
        }
        setLoadingStatus('success')
        // navigate('/users/main')
      } catch (error) {
        console.error(error)
      }
    } else {
      setLoadingStatus('warn')
      setTimeout(() => {
        setLoadingStatus('finish')
      }, 1000)
    }
  }

  return (
    <>
      <div className={styles.notification__container}>
        {loadingStatus === 'warn' && (
          <Notification notification='warn' title='???????????????????????????' />
        )}
        {loadingStatus === 'failed' &&
          errorMessage ===
            'Error: ????????????????????????,Error: ??????????????????email' && (
            <Notification
              notification='error'
              title='account ??? email ???????????????'
            />
          )}
        {loadingStatus === 'failed' &&
          errorMessage === 'Error: ????????????????????????' && (
            <Notification notification='error' title='account ???????????????' />
          )}
        {loadingStatus === 'failed' &&
          errorMessage === 'Error: ??????????????????email' && (
            <Notification notification='error' title='email ???????????????' />
          )}
        {loadingStatus === 'success' && (
          <Notification notification='success' title='????????????' />
        )}
      </div>
      <UserGrid page='settingPage' pathname={pathname}>
        <div className={styles.form__title}>
          <h3>????????????</h3>
        </div>
        <div className={styles.form__container}>
          <AuthInput
            label='??????'
            placeholder='???????????????'
            onChange={accountHandler}
            value={account.content}
            style={{ width: '100%', marginTop: '24px' }}
            isValid={account.isValid}
            message={account.message}
            count={account.count}
            upperLimit='30'
          />
          <AuthInput
            label='??????'
            placeholder='????????????????????????'
            style={{ width: '100%' }}
            onChange={usernameHandler}
            value={username.content}
            isValid={username.isValid}
            message={username.message}
            count={username.count}
            upperLimit='50'
          />
          <AuthInput
            label='Email'
            placeholder='????????? Email'
            style={{ width: '100%' }}
            onChange={emailHandler}
            value={email.content}
            isValid={email.isValid}
            message={email.message}
          />
          <AuthInput
            label='??????'
            placeholder='???????????????'
            type='password'
            style={{ width: '100%' }}
            onChange={passwordHandler}
            value={password.content}
            isValid={password.isValid}
            message={password.message}
            count={password.count}
            upperLimit='30'
          />
          <AuthInput
            label='????????????'
            placeholder='?????????????????????'
            type='password'
            style={{ width: '100%' }}
            onChange={passwordCheckHandler}
            value={passwordCheck.content}
            isValid={passwordCheck.isValid}
            message={passwordCheck.message}
          />
          <div className={styles.button__container}>
            <Button
              className='button button__lg active'
              title='??????'
              style={{ width: '88px' }}
              onClick={saveSettingHandler}
            />
          </div>
        </div>
      </UserGrid>
    </>
  )
}

export default SettingPage
