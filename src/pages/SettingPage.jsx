import React, { useEffect } from 'react'
import AuthInput from '../UI/AuthInput'
import Button from '../UI/Button'
import { UserGrid } from '../Layout/GridSystemWrapper'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'
import { useLocation } from 'react-router-dom'
import styles from './SettingPage.module.scss'
import { userPutSettingApi } from '../api/userApi'
import { useNavigate } from 'react-router-dom'

const SettingPage = () => {
  const pathname = useLocation().pathname
  const dispatch = useDispatch()
  const account = useSelector((state) => state.authInput.account)
  const username = useSelector((state) => state.authInput.username)
  const email = useSelector((state) => state.authInput.email)
  const password = useSelector((state) => state.authInput.password)
  const passwordCheck = useSelector((state) => state.authInput.passwordCheck)
  const userInfo = useSelector((state) => state.user.userInfo)
  const navigate = useNavigate()
  const authToken = localStorage.getItem('authToken')
  useEffect(() => {
    if (authToken === null) {
      navigate('/users/login')
    }
  }, [])

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

  const saveSettingHandler = async () => {
    try {
      const res = await userPutSettingApi({
        account: account.content,
        name: username.content,
        email: email.content,
        password: password.content,
        checkPassword: passwordCheck.content,
        id: userInfo.id,
      })
      if (res.status === 200) {
        navigate('/users/main')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
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
  )
}

export default SettingPage
