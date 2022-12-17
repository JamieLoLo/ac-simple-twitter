import React from 'react'
import styles from './UserFollowListItem.module.scss'
import defaultFig from './assets/icons/defaultFig.svg'
import Button from '../UI/Button'
import { followApi, unfollowApi } from '../api/followshipsApi'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../store/user-slice'
import { userGetFollowingsApi } from '../api/userApi'
import { useEffect, useState } from 'react'

const UserFollowListItem = (data) => {
  const dispatch = useDispatch()
  const userId = localStorage.getItem('userId')
  const { avatar, introduction, name, followerId, followingId, isFollowed } =
    data.data
  const defaultIntro = `Hello! I'm ${name} without introduction.`
  const profileId = localStorage.getItem('profile_id')
  const [userFollowingsData, setUserFollowingsData] = useState([])
  const matchFollowing = userFollowingsData.find(
    (data) => data.followingId === followerId
  )
  const temp = matchFollowing
    ? matchFollowing.followingId === followerId
    : false
  const isFollowUpdate = useSelector((state) => state.user.isFollowUpdate)

  // userGetFollowings
  useEffect(() => {
    const userGetFollowings = async () => {
      try {
        const res = await userGetFollowingsApi(profileId)
        await setUserFollowingsData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetFollowings()
  }, [isFollowUpdate, profileId])

  const followHandler = async () => {
    if (profileId === userId) {
      await followApi(followerId)
      await dispatch(userActions.setIsFollowUpdate())
    }
  }

  const unfollowHandler = async () => {
    if (profileId === userId) {
      await unfollowApi(isFollowed === 1 ? followingId : followerId)
      await dispatch(userActions.setIsFollowUpdate())
    }
  }

  return (
    <div className={styles.item__container}>
      <div className={styles.avatar__container}>
        <img
          className={styles.avatar}
          src={avatar ? avatar : defaultFig}
          alt='avatar'
        />
      </div>
      <div className={styles.info__container}>
        <div className={styles.info__header}>
          <p className={styles.user__name}>{name}</p>
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

export default UserFollowListItem
