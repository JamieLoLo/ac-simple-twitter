import React from 'react'
import UserFollowListItem from '../components/UserFollowListItem'
import { UserGrid } from '../Layout/GridSystemWrapper'
import { ReactComponent as PrevIcon } from '../components/assets/icons/prev.svg'
import { Link, useNavigate } from 'react-router-dom'
import styles from './UserFollowingPage.module.scss'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  userGetFollowingsApi,
  userGetProfileApi,
  userGetTweetsApi,
} from '../api/userApi'

const UserFollowingPage = () => {
  const [userTweetsData, setUserTweetsData] = useState([])
  const [userFollowingsData, setUserFollowingsData] = useState([])
  const [userProfileData, setUserProfileData] = useState({})
  const navigate = useNavigate()
  const profileId = localStorage.getItem('profile_id')
  const isFollowUpdate = useSelector((state) => state.user.isFollowUpdate)
  const authToken = localStorage.getItem('authToken')

  useEffect(() => {
    if (authToken === null) {
      navigate('/users/login')
    }
  }, [])
  // userGetProfile
  useEffect(() => {
    const userGetProfile = async () => {
      try {
        const res = await userGetProfileApi(profileId)
        if (res.status !== 200) {
          navigate('/users/login')
        }
        await setUserProfileData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetProfile()
  }, [])

  //userGetTweets
  useEffect(() => {
    const userGetTweets = async () => {
      try {
        const res = await userGetTweetsApi(profileId)
        await setUserTweetsData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetTweets()
  }, [])

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

  const userFollowingList = userFollowingsData.map((data) => (
    <UserFollowListItem data={data} key={`${data.followerId}_${data.name}`} />
  ))
  return (
    <>
      <UserGrid>
        <div className={styles.follow__container}>
          <div className={styles.user__container}>
            <div
              className={styles.icon__container}
              onClick={() => {
                navigate('/users/profile')
              }}
            >
              <PrevIcon />
            </div>
            <div className={styles.user__text}>
              <p className={styles.user__name}>{userProfileData.name}</p>
              <p className={styles.tweet__count}>
                {userTweetsData.length} 推文
              </p>
            </div>
          </div>
          <div className={styles.switch__button__container}>
            <Link to='/users/follower' className={styles.link}>
              <p className={styles.switch__button}>追隨者</p>
            </Link>
            <p className={`${styles.switch__button} ${styles.active}`}>
              正在追隨
            </p>
          </div>
          <div className={styles.follow__list__container}>
            {userFollowingsData.length === 0
              ? '沒有正在追隨'
              : userFollowingList}
          </div>
        </div>
      </UserGrid>
    </>
  )
}

export default UserFollowingPage
