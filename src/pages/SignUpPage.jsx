import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'
import Button from '../UI/Button'
import AuthInput from '../UI/AuthInput'
import { ReactComponent as Logo } from '../components/assets/icons/logo.svg'
import styles from './SignUpPage.module.scss'

const SignUpPage = () => {
  const dispatch = useDispatch()
  let account = useSelector((state) => state.account)
  let name = useSelector((state) => state.username)
  let email = useSelector((state) => state.email)
  let password = useSelector((state) => state.password)
  let checkPassword = useSelector((state) => state.passwordCheck)

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
  const refreshHandler = () => {
    dispatch(authInputActions.refreshAuthInput())
  }

  return (
    <div className={styles.form__container}>
      <div className={styles.logo}>
        <Logo />
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
  )
}

export default SignUpPage
