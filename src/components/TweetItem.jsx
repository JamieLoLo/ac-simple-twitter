import styles from './TweetItem.module.scss'
import useMoment from '../hooks/useMoment'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import likeIcon from '../components/assets/icons/like.svg'
import likeActiveIcon from '../components/assets/icons/like_active.svg'
import { useNavigate } from 'react-router-dom'
import { likeApi, unLikeApi } from '../api/likeApi'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../store/user-slice'
import { userGetProfileApi } from '../api/userApi'
import { modalActions } from '../store/modal-slice'

const TweetItem = ({ data, onClick }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = localStorage.getItem('authToken')
  const isReplyModalOpen = useSelector((state) => state.modal.isReplyModalOpen)
  const { id, User, createdAt, description, isLiked, likeCounts, replyCounts } =
    data
  const createTime = useMoment(createdAt)

  const toDetailPage = () => {
    if (authToken) {
      navigate('/users/tweet')
      localStorage.setItem('tweet_id', id)
    }
  }
  const likeHandler = async () => {
    await likeApi(id)
    await dispatch(userActions.setIsTweetUpdate())
  }

  const unlikeHandler = async () => {
    await unLikeApi(id)
    await dispatch(userActions.setIsTweetUpdate())
  }
  const replyHandler = () => {
    localStorage.setItem('tweet_id', id)
    dispatch(modalActions.setIsReplyModalOpen(true))
  }

  const profilePageHandler = async () => {
    const userGetProfile = async () => {
      try {
        const res = await userGetProfileApi(User.id)
        if (res) {
          localStorage.setItem('profile_id', User.id)
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
    <>
      <div className={styles.tweet}>
        <div className={styles.tweetInfo}>
          <img
            className={styles.avatar}
            src={User.avatar === null ? defaultFig : User.avatar}
            alt='Default Fig'
            onClick={profilePageHandler}
          />
          <div className={styles.tweetCreatorInfo}>
            <div className={styles.container}>
              <div className={styles.name} onClick={profilePageHandler}>
                {User.name}
              </div>
              <div className={styles.account}>@{User.account}</div>
            </div>
            <div className={styles.createTime}>・{createTime}</div>
          </div>
        </div>
        <div className={styles.tweetContent} onClick={toDetailPage}>
          {description}
        </div>

        <div className={styles.tweetFeedback}>
          <div className={styles.reply} onClick={replyHandler}>
            <div className={styles.messageIcon}></div>
            <div className={styles.num}>{replyCounts || 0}</div>
          </div>
          <div className={styles.like}>
            {isLiked ? (
              <img
                className={styles.likeIcon}
                src={likeActiveIcon}
                alt='like_active'
                onClick={unlikeHandler}
              />
            ) : (
              <img
                className={styles.likeIcon}
                src={likeIcon}
                alt='like'
                onClick={likeHandler}
              />
            )}
            <div className={styles.num}>{likeCounts || 0}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TweetItem
