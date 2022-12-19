import styles from './UserFollowListItem.module.scss'
// --- hook
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// --- component
import { Button } from '../UI/index'
// --- api
import { followApi, unfollowApi } from '../api/followshipsApi'
import { userGetFollowingsApi } from '../api/userApi'
// --- store
import { userActions } from '../store/user-slice'
// --- icons
import { defaultFig } from './assets/icons/index'

const FollowListItem = (data) => {
  const pathname = useLocation().pathname
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { avatar, introduction, name, followerId, followingId, isFollowed } =
    data.data
  // --- localStorage
  const profileId = Number(localStorage.getItem('profile_id'))
  const userId = Number(localStorage.getItem('userId'))
  // --- useSelector
  const profileFollowingsData = useSelector(
    (state) => state.profile.profileFollowingsData
  )
  const isFollowUpdate = useSelector((state)=> state.user.isFollowUpdate)

  // --- useEffect
  // userGetFollowings
  useEffect(() => {
    const userGetFollowings = async () => {
      try {
        const res = await userGetFollowingsApi(userId)
        await dispatch(userActions.setUserFollowingsData(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetFollowings()
  }, [dispatch, profileId, isFollowUpdate])

  // --- evnet handler
  const followHandler = async () => {
    await followApi(followerId)
    dispatch(userActions.setIsFollowUpdate())
  }
  const unfollowHandler = async () => {
    await unfollowApi(isFollowed === 1 ? followingId : followerId)
    dispatch(userActions.setIsFollowUpdate())
  }

  // helper constant
  const defaultIntro = `Hello! I'm ${name} without introduction.`
  const matchFollowing = profileFollowingsData.find(
    (data) => data.followingId === followerId
  )
  const temp = matchFollowing
    ? matchFollowing.followingId === followerId
    : false

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
          {/* <div className={styles.button__container}>
            {temp || isFollowed ? (
              <Button
                className='button button__md active'
                title='正在跟隨'
                style={{ width: '96px', height: '40px', fontSize: '14px' }}
                onClick={unfollowHandler}
              />
            ) : (
              <Button
                className='button button__md'
                title='跟隨'
                style={{ width: '64px', height: '40px', fontSize: '14px' }}
                onClick={followHandler}
              />
            )}
          </div> */}
        </div>
        <div className={styles.info__body}>
          <p>{introduction === 'null' ? defaultIntro: introduction}</p>
        </div>
      </div>
    </div>
  )
}

export default FollowListItem
