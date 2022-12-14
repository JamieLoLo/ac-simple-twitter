import React from 'react'
import { Link } from 'react-router-dom'
import AuthInput from '../UI/AuthInput'
import Button from '../UI/Button'
import { ReactComponent as Logo } from '../components/assets/icons/logo.svg'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'
import { userLoginApi } from '../api/userApi'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Notification from '../UI/Notification'
import { userActions } from '../store/user-slice'

import styles from './UserLoginPage.module.scss'

const UserLoginPage = () => {
  const [loadingStatus, setLoadingStatus] = useState('finish')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const account = useSelector((state) => state.authInput.account)
  const password = useSelector((state) => state.authInput.password)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      navigate('/users/main')
    }
  }, [navigate])

  useEffect(() => {
    if (loadingStatus === 'failed' || loadingStatus === 'success') {
      setTimeout(() => {
        if (loadingStatus === 'success') {
          setLoadingStatus('finish')
          navigate('/users/main')
        } else {
          setLoadingStatus('finish')
        }
      }, 1000)
    }
  }, [loadingStatus, navigate])

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      navigate('/users/main')
    }
  }, [navigate])

  useEffect(() => {
    if (loadingStatus === 'failed' || loadingStatus === 'success') {
      setTimeout(() => {
        if (loadingStatus === 'success') {
          setLoadingStatus('finish')
          navigate('/users/main')
        } else {
          setLoadingStatus('finish')
        }
      }, 1000)
    }
  }, [loadingStatus, navigate])

  const accountHandler = (useInput) => {
    dispatch(authInputActions.accountAuth(useInput))
  }
  const passwordHandler = (useInput) => {
    dispatch(authInputActions.passwordAuth(useInput))
  }

  const userLoginHandler = async () => {
    try {
      setLoadingStatus('start')
      const res = await userLoginApi({
        account: account.content,
        password: password.content,
      })

      if (res.status !== 200) {
        setLoadingStatus('failed')
        return
      }
      const { data } = await res
      const { token, user } = await data

      localStorage.setItem('authToken', token)
      localStorage.setItem('userId', user.id)
      localStorage.setItem('tweet_id', 504)
      setLoadingStatus('success')
    } catch (error) {
      console.error(error)
    }
  }

  const refreshHandler = () => {
    dispatch(authInputActions.refreshAuthInput())
  }

  return (
    <>
      <div className={styles.notification__container}>
        {loadingStatus === 'failed' && (
          <Notification notification='error' title='帳號不存在' />
        )}
        {loadingStatus === 'success' && (
          <Notification notification='success' title='登入成功' />
        )}
      </div>
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
            onClick={userLoginHandler}
          />
        </div>
        <div className={styles.button__switch}>
          <Link to='/signup'>
            <Button
              className='button linkButton'
              title='註冊'
              onClick={refreshHandler}
            />
          </Link>
          <span>・</span>
          <Link to='/admin/login'>
            <Button
              className='button linkButton'
              title='後台登入'
              onClick={refreshHandler}
            />
          </Link>
        </div>
      </div>
    </>
  )
}

export default UserLoginPage
