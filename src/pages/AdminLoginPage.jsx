import React from 'react'
import { Link } from 'react-router-dom'
import AuthInput from '../UI/AuthInput'
import Button from '../UI/Button'
import { ReactComponent as Logo } from '../components/assets/icons/logo.svg'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'
import { useNavigate } from 'react-router-dom'
import Notification from '../UI/Notification'
import { adminLoginApi } from '../api/adminApi'
import styles from './AdminLoginPage.module.scss'
import { useState, useEffect } from 'react'

const AdminLoginPage = () => {
  const [loadingStatus, setLoadingStatus] = useState('finish')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const account = useSelector((state) => state.authInput.account)
  const password = useSelector((state) => state.authInput.password)
  const authToken = localStorage.getItem('authToken')

  const accountHandler = (useInput) => {
    dispatch(authInputActions.accountAuth(useInput))
  }
  const passwordHandler = (useInput) => {
    dispatch(authInputActions.passwordAuth(useInput))
  }

  useEffect(() => {
    if (authToken) {
      navigate('/admin/alltweets')
    }
  }, [navigate])

  useEffect(() => {
    if (loadingStatus === 'failed' || loadingStatus === 'success') {
      setTimeout(() => {
        if (loadingStatus === 'success') {
          setLoadingStatus('finish')
          navigate('/admin/alltweets')
        } else {
          setLoadingStatus('finish')
        }
      }, 1000)
    }
  }, [loadingStatus, navigate])

  const adminLoginHandler = async () => {
    try {
      setLoadingStatus('start')
      const res = await adminLoginApi({
        account: account.content,
        password: password.content,
      })
      if (res.status !== 200) {
        setLoadingStatus('failed')
        return
      }
      localStorage.setItem('authToken', res.data.token)
      setLoadingStatus('success')
    } catch (error) {
      console.error(error)
    }

    // success => res.data.token, res.status = 200
    // failed => res.response.status = 401，"帳號不存在"
    // failed => res.response.status = 500，"登入失敗"
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
            onClick={adminLoginHandler}
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
    </>
  )
}

export default AdminLoginPage
