import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthInput from '../UI/AuthInput'
import Button from '../UI/Button'
import { ReactComponent as Logo } from '../components/assets/icons/logo.svg'

import styles from './AdminLoginPage.module.scss'

const AdminLoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className={styles.form__container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <h3>後台登入</h3>
      <AuthInput
        label='帳號'
        placeholder='請輸入帳號'
        value={account}
        onChange={(userInputValue) => setAccount(userInputValue)}
      />
      <AuthInput
        label='密碼'
        placeholder='請輸入密碼'
        type='password'
        value={password}
        onChange={(userInputValue) => setPassword(userInputValue)}
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
          <Button className='button linkButton' title='前台登入' />
        </Link>
      </div>
    </div>
  )
}

export default AdminLoginPage