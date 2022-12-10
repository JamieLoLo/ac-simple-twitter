import React from 'react'
import AuthInput from '../UI/AuthInput'
import Button from '../UI/Button'
import Navigation from '../Layout/Navigation'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'

import styles from './SettingPage.module.scss'

const SettingPage = () => {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.account)
  const username = useSelector((state) => state.username)
  const email = useSelector((state) => state.email)
  const password = useSelector((state) => state.password)
  const passwordCheck = useSelector((state) => state.passwordCheck)

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

  return (
    <div className='main__container'>
      <Navigation />
      <div className='control-container'>
        <div className={styles.form__title}>
          <h3>帳戶設定</h3>
        </div>
        <div className={styles.form__container}>
          <AuthInput
            label='帳號'
            placeholder='請輸入帳號'
            onChange={accountHandler}
            value={account.content}
            style={{ width: '593px', marginTop: '24px' }}
            isValid={account.isValid}
            message={account.message}
            count={account.count}
            upperLimit='30'
          />
          <AuthInput
            label='名稱'
            placeholder='請輸入使用者名稱'
            style={{ width: '593px' }}
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
            style={{ width: '593px' }}
            onChange={emailHandler}
            value={email.content}
            isValid={email.isValid}
            message={email.message}
          />
          <AuthInput
            label='密碼'
            placeholder='請設定密碼'
            type='password'
            style={{ width: '593px' }}
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
            style={{ width: '593px' }}
            onChange={passwordCheckHandler}
            value={passwordCheck.content}
            isValid={passwordCheck.isValid}
            message={passwordCheck.message}
          />
          <div className={styles.button__container}>
            <Button
              className='button button__lg active'
              title='儲存'
              style={{ width: '88px' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingPage
