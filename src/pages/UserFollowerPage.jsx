import React from 'react'
import { UserGrid } from '../Layout/GridSystemWrapper'
import { ReactComponent as PrevIcon } from '../components/assets/icons/prev.svg'
import UserFollowListItem from '../components/UserFollowListItem'
import { Link, useNavigate } from 'react-router-dom'
import styles from './UserFollowerPage.module.scss'
import { useEffect, useState } from 'react'
import {
  userGetFollowersApi,
  userGetTweetsApi,
  userGetProfileApi,
} from '../api/userApi'
import { useSelector } from 'react-redux'

const UserFollowerPage = () => {
  const [userFollowersData, setUserFollowersData] = useState([])
  const [userProfileData, setUserProfileData] = useState({})
  const [userTweetsData, setUserTweetsData] = useState([])
  const userInfo = useSelector((state) => state.user.userInfo)
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

  // userGetFollowers
  useEffect(() => {
    const userGetFollowers = async (data) => {
      try {
        const res = await userGetFollowersApi(data)
        await setUserFollowersData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetFollowers(userInfo.id)
  }, [])

  const userFollowerList = userFollowersData.map((data) => (
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
            <p className={`${styles.switch__button} ${styles.active}`}>
              追隨者
            </p>
            <Link to='/users/following' className={styles.link}>
              <p className={styles.switch__button}>正在追隨</p>
            </Link>
          </div>
          <div className={styles.follow__list__container}>
            {userFollowersData.length === 0 ? '沒有追隨者' : userFollowerList}
          </div>
        </div>
      </UserGrid>
    </>
  )
}

export default UserFollowerPage
