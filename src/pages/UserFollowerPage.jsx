import styles from './UserFollowerPage.module.scss'
// --- hook
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// --- component
import { UserGrid } from '../Layout/GridSystemWrapper'
import UserFollowListItem from '../components/UserFollowListItem'
// --- api
import { userGetFollowersApi, userGetProfileApi } from '../api/userApi'
// --- store
import { userActions } from '../store/user-slice'
// --- icons
import { prevIcon } from '../components/assets/icons/index'

const UserFollowerPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // --- localStorage
  const userId = Number(localStorage.getItem('userId'))
  const authToken = localStorage.getItem('authToken')
  // --- useState
  // --- useSelector
  const isFollowUpdate = useSelector((state) => state.user.isFollowUpdate)
  const userInfo = useSelector((state) => state.user.userInfo)
  const userFollowersData = useSelector((state) => state.user.userFollowersData)
  // --- useEffect
  useEffect(() => {
    if (authToken === null) {
      navigate('/users/login')
    }
  }, [authToken, navigate])
  // userGetProfile
  useEffect(() => {
    const userGetProfile = async () => {
      try {
        const res = await userGetProfileApi(userId)
        await dispatch(userActions.setUserInfo(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetProfile()
  }, [dispatch, navigate, userId])

  // userGetFollowers
  useEffect(() => {
    const userGetFollowers = async () => {
      try {
        const res = await userGetFollowersApi(userId)
        await dispatch(userActions.setUserFollowersData(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetFollowers()
  }, [dispatch, isFollowUpdate, userId])
  
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
              <img src={prevIcon} alt='prev' />
            </div>
            <div className={styles.user__text}>
              <p className={styles.user__name}>{userInfo.name}</p>
              <p className={styles.tweet__count}>{userInfo.tweetCounts} 推文</p>
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
