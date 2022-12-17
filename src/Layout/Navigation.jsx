import styles from './Navigation.module.scss'
// --- hook
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
// --- component
import { Button, TweetModal } from '../UI/index'
// --- api
// --- store
import { authInputActions } from '../store/authInput-slice'
// --- icons
import { logoIcon } from '../components/assets/icons/index'

const Navigation = (props) => {
  const { condition, pathname } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // --- localStorage
  const userId = localStorage.getItem('userId')
  const profileId = localStorage.getItem('profile_id')
  // --- useState
  const [tweetModal, setTweetModal] = useState(false)
  // --- event handler
  const getProfileIdHandler = () => {
    localStorage.setItem('profile_id', localStorage.getItem('userId'))
  }
  const logoutHandler = async () => {
    localStorage.clear()
    await dispatch(authInputActions.refreshAuthInput())
    navigate('/users/login')
  }

  return (
    <>
      <div className={styles.modalContainer}>
        <TweetModal
          trigger={tweetModal}
          setTweetModal={setTweetModal}
        />
      </div>

      <nav className={styles.nav}>
        <ul>
          <li style={{ cursor: 'default' }}>
            <img src={logoIcon} alt='logoIcon' />
          </li>
          {condition === 'user' && (
            <>
              <li
                onClick={() => {
                  navigate('/users/main')
                }}
              >
                <div
                  className={clsx('', {
                    [styles.icon__main__active]: pathname === '/users/main',
                    [styles.icon__main]: pathname !== '/users/main',
                  })}
                ></div>
                <p
                  className={clsx('', {
                    [styles.active]: pathname === '/users/main',
                  })}
                >
                  首頁
                </p>
              </li>
              <li
                onClick={() => {
                  navigate('/users/profile')
                }}
              >
                <div
                  className={clsx('', {
                    [styles.icon__personal__active]:
                      pathname === '/users/profile',
                    [styles.icon__personal]:
                      pathname !== '/users/profile' || userId !== profileId,
                  })}
                ></div>
                <p
                  className={clsx('', {
                    [styles.active]:
                      pathname === '/users/profile' && userId === profileId,
                  })}
                  onClick={getProfileIdHandler}
                >
                  個人資料
                </p>
              </li>
              <li
                onClick={() => {
                  navigate('/users/setting')
                }}
              >
                <div
                  className={clsx('', {
                    [styles.icon__setting__active]:
                      pathname === '/users/setting',
                    [styles.icon__setting]: pathname !== '/users/setting',
                  })}
                ></div>
                <p
                  className={clsx('', {
                    [styles.active]: pathname === '/users/setting',
                  })}
                >
                  設定
                </p>
              </li>
              <Button
                className='button button__xl active'
                title='推文'
                style={{ width: '100%' }}
                onClick={() => setTweetModal(true)}
              />
            </>
          )}
          {condition === 'admin' && (
            <>
              <li
                onClick={() => {
                  navigate('/admin/alltweets')
                }}
              >
                <div
                  className={clsx('', {
                    [styles.icon__main__active]:
                      pathname === '/admin/alltweets',
                    [styles.icon__main]: pathname !== '/admin/alltweets',
                  })}
                ></div>
                <p
                  className={clsx('', {
                    [styles.active]: pathname === '/admin/alltweets',
                  })}
                >
                  推文清單
                </p>
              </li>
              <li
                onClick={() => {
                  navigate('/admin/allusers')
                }}
              >
                <div
                  className={clsx('', {
                    [styles.icon__personal__active]:
                      pathname === '/admin/allusers',
                    [styles.icon__personal]: pathname !== '/admin/allusers',
                  })}
                ></div>
                <p
                  className={clsx('', {
                    [styles.active]: pathname === '/admin/allusers',
                  })}
                >
                  使用者列表
                </p>
              </li>
            </>
          )}
        </ul>
        <li onClick={logoutHandler}>
          <div className={styles.icon__logout}></div>
          <p>登出</p>
        </li>
      </nav>
    </>
  )
}

export default Navigation
