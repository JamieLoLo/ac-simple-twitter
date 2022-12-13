import React from 'react'
import UserFollowListItem from '../components/UserFollowListItem'
import { UserGrid } from '../Layout/GridSystemWrapper'
import { ReactComponent as PrevIcon } from '../components/assets/icons/prev.svg'
import { Link, useNavigate } from 'react-router-dom'
import styles from './UserFollowingPage.module.scss'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userGetFollowingsApi, userGetProfileApi, userGetTweetsApi } from '../api/userApi'

const UserFollowingPage = () => {
  const [userTweetsData, setUserTweetsData] = useState([])
  const [userFollowingsData, setUserFollowingsData] = useState([])
  const userInfo = useSelector((state) => state.user.userInfo)
  const [userProfileData, setUserProfileData] = useState({})
  const navigate = useNavigate()

  // userGetProfile
  useEffect(() => {
    const userGetProfile = async (data) => {
      try {
        const res = await userGetProfileApi(data)
        if (res.status !== 200) {
          navigate('/users/login')
        }
        await setUserProfileData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetProfile(userInfo.id)
  }, [])

  //userGetTweets
  useEffect(() => {
    const userGetTweets = async (data) => {
      try {
        const res = await userGetTweetsApi(data)
        await setUserTweetsData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetTweets(userInfo.id)
  }, [])

  // userGetFollowings
  useEffect(() => {
    const userGetFollowings = async (data) => {
      try {
        const res = await userGetFollowingsApi(data)
        await setUserFollowingsData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetFollowings(userInfo.id)
  }, [])

  const userFollowingList = userFollowingsData.map((data) => (
    <UserFollowListItem data={data} key={data.followerId} />
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
