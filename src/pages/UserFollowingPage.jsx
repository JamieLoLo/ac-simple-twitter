import styles from './UserFollowingPage.module.scss'
// --- hook
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
// --- component
import UserFollowListItem from '../components/UserFollowListItem'
import { UserGrid } from '../Layout/GridSystemWrapper'
// --- api
import {
  userGetFollowingsApi,
  userGetProfileApi,
  userGetTweetsApi,
} from '../api/userApi'
// --- store
import { userActions } from '../store/user-slice'
// --- icons
import { prevIcon } from '../components/assets/icons/index'

const UserFollowingPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // --- localStorage
  const profileId = localStorage.getItem('profile_id')
  const authToken = localStorage.getItem('authToken')
  // --- useState
  // --- useSelector
  const isFollowUpdate = useSelector((state) => state.user.isFollowUpdate)
  const userTweetsData = useSelector((state) => state.user.userTweetsData)
  const userFollowingsData = useSelector(
    (state) => state.user.userFollowingsData
  )
  const userInfo = useSelector((state) => state.user.userInfo)
  // --- useEffect
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
        await dispatch(userActions.setUserInfo(res.data))
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
        await dispatch(userActions.setUserTweetsData(res.data))
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
        await dispatch(userActions.setUserFollowingsData(res.data))
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
              <img src={prevIcon} alt='prev' />
            </div>
            <div className={styles.user__text}>
              <p className={styles.user__name}>{userInfo.name}</p>
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
