import styles from './UserFollowerPage.module.scss'
// --- hook
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// --- component
import { UserGrid } from '../Layout/GridSystemWrapper'
import UserFollowListItem from '../components/UserFollowListItem'
// --- api
import {
  userGetFollowersApi,
  userGetTweetsApi,
  userGetProfileApi,
} from '../api/userApi'
// --- store
import { userActions } from '../store/user-slice'
// --- icons
import { ReactComponent as PrevIcon } from '../components/assets/icons/prev.svg'

const UserFollowerPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // --- localStorage
  const profileId = localStorage.getItem('profile_id')
  const authToken = localStorage.getItem('authToken')
  // --- useState
  // --- useSelector
  const isFollowUpdate = useSelector((state) => state.user.isFollowUpdate)
  const userInfo = useSelector((state) => state.user.userInfo)
  const userTweetsData = useSelector((state) => state.user.userTweetsData)
  const userFollowersData = useSelector((state) => state.user.userFollowersData)
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
  }, [navigate, profileId])

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
  }, [profileId])

  // userGetFollowers
  useEffect(() => {
    const userGetFollowers = async () => {
      try {
        const res = await userGetFollowersApi(profileId)
        await dispatch(userActions.setUserFollowersData(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetFollowers()
  }, [isFollowUpdate, profileId])
  // --- helper constant
  const userFollowerList = userFollowersData.map((data) => (
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
              <p className={styles.user__name}>{userInfo.name}</p>
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
            {userFollowersData.length === 0 ? undefined : userFollowerList}
          </div>
        </div>
      </UserGrid>
    </>
  )
}

export default UserFollowerPage
