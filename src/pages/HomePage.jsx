import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Notification from '../UI/Notification'
import styles from './HomePage.module.scss'

const HomePage = () => {
  const [redirect, setRedirect] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setRedirect('main')
      setTimeout(() => {
        navigate('/users/main')
      }, 1500)
    } else {
      setRedirect('login')
      setTimeout(() => {
        navigate('/users/login')
      }, 1500)
    }
  }, [navigate])
  return (
    <div className={styles.main__container}>
      <div className={styles.notification__container}>
        {redirect === 'main' && (
          <Notification notification='loading' title='正在導向首頁' />
        )}
        {redirect === 'login' && (
          <Notification
            notification='loading'
            title='請先登入'
            title2='正在導向登入頁面'
          />
        )}
      </div>
    </div>
  )
}

export default HomePage
