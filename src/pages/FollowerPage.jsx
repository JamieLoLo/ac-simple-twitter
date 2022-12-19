import styles from './FollowerPage.module.scss'
// --- hook
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// --- component
import { UserGrid } from '../Layout/GridSystemWrapper'
import FollowListItem from '../components/FollowListItem'
// --- api
import { userGetFollowersApi, userGetProfileApi } from '../api/userApi'
// --- store
import { profileActions } from '../store/profile-slice'
// --- icons
import { prevIcon } from '../components/assets/icons/index'

const UserFollowerPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // --- localStorage
  const profileId = Number(localStorage.getItem('profile_id'))
  const authToken = localStorage.getItem('authToken')
  // --- useState
  // --- useSelector
  const profileInfo = useSelector((state) => state.profile.profileInfo)
  const profileFollowersData = useSelector(
    (state) => state.profile.profileFollowersData
  )
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
        const res = await userGetProfileApi(profileId)
        await dispatch(profileActions.setProfileInfo(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetProfile()
  }, [dispatch, profileId])

  // userGetFollowers
  useEffect(() => {
    const userGetFollowers = async () => {
      try {
        const res = await userGetFollowersApi(profileId)
        await dispatch(profileActions.setProfileFollowersData(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetFollowers()
  }, [dispatch, profileId])

  // --- helper constant
  const userFollowerList = profileFollowersData.map((data) => (
    <FollowListItem data={data} key={`${data.followerId}_${data.name}`} />
  ))

  return (
    <>
      <UserGrid>
        <div className={styles.follow__container}>
          <div className={styles.user__container}>
            <div
              className={styles.icon__container}
              onClick={() => {
                navigate('/users/profile/other')
              }}
            >
              <img src={prevIcon} alt='prev' />
            </div>
            <div className={styles.user__text}>
              <p className={styles.user__name}>{profileInfo.name}</p>
              <p className={styles.tweet__count}>
                {profileInfo.tweetCounts} 推文
              </p>
            </div>
          </div>
          <div className={styles.switch__button__container}>
            <p className={`${styles.switch__button} ${styles.active}`}>
              追隨者
            </p>
            <Link to='/users/following/other' className={styles.link}>
              <p className={styles.switch__button}>正在追隨</p>
            </Link>
          </div>
          <div className={styles.follow__list__container}>
            {profileFollowersData.length === 0 ? undefined : userFollowerList}
          </div>
        </div>
      </UserGrid>
    </>
  )
}

export default UserFollowerPage
