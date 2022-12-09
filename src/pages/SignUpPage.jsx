import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../UI/Button'
import AuthInput from '../UI/AuthInput'
import { ReactComponent as Logo } from '../components/assets/icons/logo.svg'
import styles from './SignUpPage.module.scss'

const SignUpPage = () => {
  const [account, setAccount] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  return (
    <div className={styles.form__container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <h3>建立你的帳號</h3>
      <AuthInput
        label='帳號'
        placeholder='請輸入帳號'
        value={account}
        onChange={(userInputValue) => setAccount(userInputValue)}
      />
      <AuthInput
        label='名稱'
        placeholder='請輸入使用者名稱'
        value={username}
        onChange={(userInputValue) => setUsername(userInputValue)}
      />
      <AuthInput
        label='Email'
        placeholder='請輸入 Email'
        value={email}
        onChange={(userInputValue) => setEmail(userInputValue)}
      />
      <AuthInput
        label='密碼'
        placeholder='請設定密碼'
        type='password'
        value={password}
        onChange={(userInputValue) => setPassword(userInputValue)}
      />
      <AuthInput
        label='密碼確認'
        placeholder='請再度輸入密碼'
        type='password'
        value={passwordConfirm}
        onChange={(userInputValue) => setPasswordConfirm(userInputValue)}
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
          <Button className='button linkButton' title='取消' />
        </Link>
      </div>
    </div>
  )
}

export default SignUpPage
