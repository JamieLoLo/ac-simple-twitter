import styles from './FollowingPage.module.scss'
// --- hook
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
// --- component
import FollowListItem from '../components/FollowListItem'
import { UserGrid } from '../Layout/GridSystemWrapper'
// --- api
import { userGetFollowingsApi, userGetProfileApi } from '../api/userApi'
// --- store
import { profileActions } from '../store/profile-slice'
// --- icons
import { prevIcon } from '../components/assets/icons/index'

const UserFollowingPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // --- localStorage
  const profileId = Number(localStorage.getItem('profile_id'))
  const authToken = localStorage.getItem('authToken')
  // --- useState
  // --- useSelector
  const profileFollowingsData = useSelector(
    (state) => state.profile.profileFollowingsData
  )
  const profileInfo = useSelector((state) => state.profile.profileInfo)
  const isFollowUpdate = useSelector((state) => state.user.isFollowUpdate)
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
        await dispatch(profileActions.setProfileInfo(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetProfile()
  }, [dispatch, profileId])

  // userGetFollowings
  useEffect(() => {
    const userGetFollowings = async () => {
      try {
        const res = await userGetFollowingsApi(profileId)
        await dispatch(profileActions.setProfileFollowingsData(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetFollowings()
  }, [dispatch ,isFollowUpdate])
  const FollowingList = profileFollowingsData.map((data) => (
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
            <Link to='/users/follower/other' className={styles.link}>
              <p className={styles.switch__button}>追隨者</p>
            </Link>
            <p className={`${styles.switch__button} ${styles.active}`}>
              正在追隨
            </p>
          </div>
          <div className={styles.follow__list__container}>
            {profileFollowingsData.length === 0 ? undefined : FollowingList}
          </div>
        </div>
      </UserGrid>
    </>
  )
}

export default UserFollowingPage
