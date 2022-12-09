import React, { useState } from 'react'
import AuthInput from '../UI/AuthInput'
import Button from '../UI/Button'
import Navigation from '../Layout/Navigation'

import styles from './SettingPage.module.scss'

const SettingPage = () => {
  const [account, setAccount] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

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
            value={account}
            style={{ width: '593px', marginTop: '24px' }}
            onChange={(userInputValue) => setAccount(userInputValue)}
          />
          <AuthInput
            label='名稱'
            placeholder='請輸入使用者名稱'
            value={username}
            style={{ width: '593px' }}
            onChange={(userInputValue) => setUsername(userInputValue)}
          />
          <AuthInput
            label='Email'
            placeholder='請輸入 Email'
            value={email}
            style={{ width: '593px' }}
            onChange={(userInputValue) => setEmail(userInputValue)}
          />
          <AuthInput
            label='密碼'
            placeholder='請設定密碼'
            type='password'
            value={password}
            style={{ width: '593px' }}
            onChange={(userInputValue) => setPassword(userInputValue)}
          />
          <AuthInput
            label='密碼確認'
            placeholder='請再度輸入密碼'
            type='password'
            value={passwordConfirm}
            style={{ width: '593px' }}
            onChange={(userInputValue) => setPasswordConfirm(userInputValue)}
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
