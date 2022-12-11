import React from 'react'
import { Link } from 'react-router-dom'
import AuthInput from '../UI/AuthInput'
import Button from '../UI/Button'
import { ReactComponent as Logo } from '../components/assets/icons/logo.svg'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'

import styles from './AdminLoginPage.module.scss'

const AdminLoginPage = () => {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.account)
  const password = useSelector((state) => state.password)

  const accountHandler = (useInput) => {
    dispatch(authInputActions.accountAuth(useInput))
  }
  const passwordHandler = (useInput) => {
    dispatch(authInputActions.passwordAuth(useInput))
  }
  const refreshHandler = () => {
    dispatch(authInputActions.refreshAuthInput())
  }

  return (
    <div className={styles.form__container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <h3>後台登入</h3>
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
      <div className={styles.button__container}>
        <Button
          className='button button__xl active'
          style={{ width: '356px' }}
          title='登入'
        />
      </div>
      <div className={styles.button__switch}>
        <Link to='/users/login'>
          <Button
            className='button linkButton'
            title='前台登入'
            onClick={refreshHandler}
          />
        </Link>
      </div>
    </div>
  )
}

export default AdminLoginPage
