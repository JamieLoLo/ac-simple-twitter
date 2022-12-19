import styles from './UserFollowListItem.module.scss'
// --- hook
import { useNavigate, useLocation } from 'react-router-dom'
// --- component
// --- api
// --- store
// --- icons
import { defaultFig } from './assets/icons/index'

const FollowListItem = (data) => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const { avatar, introduction, name, followerId, followingId } = data.data
  // --- localStorage
  const userId = Number(localStorage.getItem('userId'))
  // --- useSelector

  // --- useEffect

  // helper constant
  const defaultIntro = `Hello! I'm ${name} without introduction.`

  const profilePageHandler = async () => {
    if (
      pathname === '/users/follower' ||
      pathname === '/users/follower/other'
    ) {
      localStorage.setItem('profile_id', followerId)
      if (followerId === userId) {
        navigate('/users/profile')
        return
      }
      navigate('/users/profile/other')
      return
    } else if (
      pathname === '/users/following' ||
      pathname === '/users/following/other'
    ) {
      localStorage.setItem('profile_id', followingId)
      if (followingId === userId) {
        navigate('/users/profile')
        return
      }
      navigate('/users/profile/other')
      return
    }
  }

  return (
    <div className={styles.item__container}>
      <div className={styles.avatar__container} onClick={profilePageHandler}>
        <img
          className={styles.avatar}
          src={avatar ? avatar : defaultFig}
          alt='avatar'
        />
      </div>
      <div className={styles.info__container}>
        <div className={styles.info__header}>
          <p className={styles.user__name} onClick={profilePageHandler}>
            {name}
          </p>
        </div>
        <div className={styles.info__body}>
          <p>{introduction === 'null' ? defaultIntro : introduction}</p>
        </div>
      </div>
    </div>
  )
}

export default FollowListItem
