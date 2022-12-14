import styles from './RecommendFollowItem.module.scss'
import Button from '../UI/Button'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import { unfollowApi, followApi } from '../api/followshipsApi'
import { useDispatch } from 'react-redux'
import { userActions } from '../store/user-slice'

const RecommendFollowItem = ({ data }) => {
  const { account, avatar, isFollowed, name, id } = data
  const userId = Number(localStorage.getItem('userId'))
  const dispatch = useDispatch()
  const unfollowHandler = async () => {
    await unfollowApi(data.id)
    await dispatch(userActions.setIsUpdate())
  }
  const followHandler = async () => {
    await followApi(data.id)
    await dispatch(userActions.setIsUpdate())
  }

  return (
    <div className={styles.recommendFollowItem}>
      <div className={styles.tweetInfo}>
        <img
          className={styles.avatar}
          src={avatar ? avatar : defaultFig}
          alt='Default Fig'
        />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.name}>{name}</div>
          <div className={styles.account}>@{account}</div>
        </div>
      </div>
      {userId !== id && (
        <div className={styles.buttonContainer}>
          {isFollowed ? (
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
