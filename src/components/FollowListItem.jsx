import styles from './UserFollowListItem.module.scss'
// --- hook
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { avatar, introduction, name, followerId, followingId, isFollowed } =
    data.data
  // --- localStorage
  const profileId = Number(localStorage.getItem('profile_id'))
  // --- useSelector
  const profileFollowingsData = useSelector(
    (state) => state.profile.profileFollowingsData
  )

  // --- useEffect
  // userGetFollowings
  useEffect(() => {
    const userGetFollowings = async () => {
      try {
        const res = await userGetFollowingsApi(profileId)
        await dispatch(userActions.setUserFollowingsData(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetFollowings()
  }, [dispatch, profileId])

  // --- evnet handler
  const followHandler = async () => {
      await followApi(followerId)
  }
  const unfollowHandler = async () => {
      await unfollowApi(isFollowed === 1 ? followingId : followerId)
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
    if (profileFollowingsData.length === 0) {
      try {
        await localStorage.setItem('profile_id', followerId)
        await navigate('/users/profile/other')
      } catch (error) {
        console.error(error)
        return error
      }
    } else if (profileFollowingsData.length !== 0) {
      try {
        await localStorage.setItem('profile_id', followingId)
        await navigate('/users/profile/other')
      } catch (error) {
        console.error(error)
        return error
      }
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
          <div className={styles.button__container}>
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
          </div>
        </div>
        <div className={styles.info__body}>
          <p>{introduction || defaultIntro}</p>
        </div>
      </div>
    </div>
  )
}

export default FollowListItem
