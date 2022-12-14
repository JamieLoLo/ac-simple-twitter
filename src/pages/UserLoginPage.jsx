import styles from './UserLoginPage.module.scss'
// --- hook
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
// --- component
import { Button, AuthInput, Notification } from '../UI/index'
// --- api
import { userLoginApi } from '../api/userApi'
// --- store
import { authInputActions } from '../store/authInput-slice'
// --- icons
import { logoIcon } from '../components/assets/icons/index'

const UserLoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // --- localStorage
  const authToken = localStorage.getItem('authToken')
  // --- useState
  const [loadingStatus, setLoadingStatus] = useState('finish')
  // --- useSelector
  const account = useSelector((state) => state.authInput.account)
  const password = useSelector((state) => state.authInput.password)
  // --- useEffect
  useEffect(() => {
    if (authToken !== null) {
      navigate('/users/main')
    }
  }, [authToken, navigate])

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

  // --- event Handler
  const accountHandler = (useInput) => {
    dispatch(authInputActions.accountAuth(useInput))
  }
  const passwordHandler = (useInput) => {
    dispatch(authInputActions.passwordAuth(useInput))
  }

  const userLoginHandler = async () => {
    try {
      localStorage.clear()
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
      localStorage.setItem('profile_id', user.id)
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
          <Notification notification='error' title='???????????????' />
        )}
        {loadingStatus === 'success' && (
          <Notification notification='success' title='????????????' />
        )}
      </div>
      <div className={styles.form__container}>
        <div className={styles.logo}>
          <img src={logoIcon} alt='logo' />
        </div>
        <h3>?????? Alphitter</h3>
        <AuthInput
          label='??????'
          placeholder='???????????????'
          onChange={accountHandler}
          value={account.content}
          isValid={account.isValid}
          message={account.message}
          count={account.count}
          upperLimit='30'
        />
        <AuthInput
          label='??????'
          placeholder='???????????????'
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
            title='??????'
            style={{ width: '356px' }}
            onClick={userLoginHandler}
          />
        </div>
        <div className={styles.button__switch}>
          <Link to='/signup'>
            <Button
              className='button linkButton'
              title='??????'
              onClick={refreshHandler}
            />
          </Link>
          <span>???</span>
          <Link to='/admin/login'>
            <Button
              className='button linkButton'
              title='????????????'
              onClick={refreshHandler}
            />
          </Link>
        </div>
      </div>
    </>
  )
}

export default UserLoginPage
