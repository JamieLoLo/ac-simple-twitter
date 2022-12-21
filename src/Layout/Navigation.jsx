import styles from './Navigation.module.scss'
// --- hook
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// --- component
import { Button } from '../UI/index'
// --- api
// --- store
import { authInputActions } from '../store/authInput-slice'
import { modalActions } from '../store/modal-slice'
// --- icons
import { logoIcon } from '../components/assets/icons/index'

const Navigation = (props) => {
  const { condition, pathname } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // --- localStorage
  // --- useSelector
  const userInfo = useSelector((state) => state.user.userInfo)
  // const isTweetModalOpen = useSelector((state) => state.modal.isTweetModalOpen)
  const getProfileIdHandler = () => {
    localStorage.setItem('profile_id', localStorage.getItem('userId'))
  }
  const logoutHandler = async () => {
    localStorage.clear()
    await dispatch(authInputActions.refreshAuthInput())
    navigate('/users/login')
  }

  const settingHandler = () => {
    dispatch(authInputActions.accountAuth(userInfo.account))
    dispatch(authInputActions.usernameAuth(userInfo.name))
    dispatch(authInputActions.emailAuth(userInfo.email))
    navigate('/users/setting')
  }

  return (
    <>
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
                    [styles.icon__personal]: pathname !== '/users/profile',
                  })}
                ></div>
                <p
                  className={clsx('', {
                    [styles.active]: pathname === '/users/profile',
                  })}
                  onClick={getProfileIdHandler}
                >
                  個人資料
                </p>
              </li>
              <li onClick={settingHandler}>
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
                onClick={() => {
                  dispatch(modalActions.setIsTweetModalOpen(true))
                  navigate('/users/main')
                }}
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
