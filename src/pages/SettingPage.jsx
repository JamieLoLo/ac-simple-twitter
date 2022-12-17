import styles from './SettingPage.module.scss'
// --- hook
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// --- component
import { AuthInput, Button, Notification} from '../UI/index'
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
  }, [])

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
        await userPutSettingApi({
          account: account.content,
          name: username.content,
          email: email.content,
          password: password.content,
          checkPassword: passwordCheck.content,
          id: userInfo.id,
        })
        navigate('/users/main')
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
          <Notification notification='warn' title='請完整輸入設定資料' />
        )}
      </div>
      <UserGrid page='settingPage' pathname={pathname}>
        <div className={styles.form__title}>
          <h3>帳戶設定</h3>
        </div>
        <div className={styles.form__container}>
          <AuthInput
            label='帳號'
            placeholder='請輸入帳號'
            onChange={accountHandler}
            value={account.content}
            style={{ width: '100%', marginTop: '24px' }}
            isValid={account.isValid}
            message={account.message}
            count={account.count}
            upperLimit='30'
          />
          <AuthInput
            label='名稱'
            placeholder='請輸入使用者名稱'
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
            placeholder='請輸入 Email'
            style={{ width: '100%' }}
            onChange={emailHandler}
            value={email.content}
            isValid={email.isValid}
            message={email.message}
          />
          <AuthInput
            label='密碼'
            placeholder='請設定密碼'
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
            label='密碼確認'
            placeholder='請再度輸入密碼'
            type='password'
            style={{ width: '100%' }}
            onChange={passwordCheckHandler}
            value={passwordCheck.content}
            isValid={passwordCheck.isValid}
            message={passwordCheck.message}
          />
          <div className={styles.button__container}>
            {(account.content || username.content || email.content) && (
              <Button
                className='button button__lg'
                title='取消變更'
                style={{ width: '130px', margin: '0px 20px' }}
                onClick={() => {
                  dispatch(authInputActions.refreshAuthInput())
                }}
              />
            )}
            <Button
              className='button button__lg active'
              title='儲存'
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
