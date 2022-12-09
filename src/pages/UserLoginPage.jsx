import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthInput from '../UI/AuthInput'
import Button from '../UI/Button'
import { ReactComponent as Logo } from '../components/assets/icons/logo.svg'

import styles from './UserLoginPage.module.scss'

const UserLoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={styles.form__container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <h3>登入 Alphitter</h3>
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
