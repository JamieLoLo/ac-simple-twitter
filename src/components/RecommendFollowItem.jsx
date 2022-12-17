import styles from './RecommendFollowItem.module.scss'
import Button from '../UI/Button'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import { unfollowApi, followApi } from '../api/followshipsApi'
import { useDispatch } from 'react-redux'
import { userActions } from '../store/user-slice'
import { userGetProfileApi } from '../api/userApi'
import { useNavigate } from 'react-router-dom'

const RecommendFollowItem = ({ data }) => {
  const { account, avatar, isFollowed, name, id } = data
  const userId = Number(localStorage.getItem('userId'))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const unfollowHandler = async () => {
    await unfollowApi(data.id)
    await dispatch(userActions.setIsFollowUpdate())
  }
  const followHandler = async () => {
    await followApi(data.id)
    await dispatch(userActions.setIsFollowUpdate())
  }
  const profilePageHandler = () => {
    const userGetProfile = async () => {
      try {
        const res = await userGetProfileApi(id)
        if (res) {
          localStorage.setItem('profile_id', id)
          navigate('/users/profile')
        }
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetProfile()
  }
  return (
    <div className={styles.recommendFollowItem}>
      <div className={styles.tweetInfo}>
        <img
          className={styles.avatar}
          src={avatar ? avatar : defaultFig}
          alt='Default Fig'
          onClick={profilePageHandler}
        />
        <div className={styles.tweetCreatorInfo} onClick={profilePageHandler}>
          <div className={styles.name}>{name}</div>
          <div className={styles.account}>@{account}</div>
        </div>
      </div>
      {userId !== id && (
        <div className={styles.buttonContainer}>
          {isFollowed === 1 ? (
            <Button
              className='button active button__md'
              style={{ width: '90px', fontSize: '14px' }}
              title='正在跟隨'
              onClick={unfollowHandler}
            />
          ) : (
            <Button
              className='button button__md'
              style={{ width: '66px', height: '40px' }}
              title='跟隨'
              onClick={followHandler}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default RecommendFollowItem
