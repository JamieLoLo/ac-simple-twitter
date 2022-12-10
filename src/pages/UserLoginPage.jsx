import React from 'react'
import { Link } from 'react-router-dom'
import AuthInput from '../UI/AuthInput'
import Button from '../UI/Button'
import { ReactComponent as Logo } from '../components/assets/icons/logo.svg'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'

import styles from './UserLoginPage.module.scss'

const UserLoginPage = () => {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.account)
  const password = useSelector((state) => state.password)

  const accountHandler = (useInput) => {
    dispatch(authInputActions.accountAuth(useInput))
  }
  const passwordHandler = (useInput) => {
    dispatch(authInputActions.passwordAuth(useInput))
  }

  return (
    <div className={styles.form__container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <h3>登入 Alphitter</h3>
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
          title='登入'
          style={{ width: '356px' }}
        />
      </div>
      <div className={styles.button__switch}>
        <Link to='/signup'>
          <Button className='button linkButton' title='註冊' />
        </Link>
        <span>・</span>
        <Link to='/admin/login'>
          <Button className='button linkButton' title='後台登入' />
        </Link>
      </div>
    </div>
  )
}

export default UserLoginPage
