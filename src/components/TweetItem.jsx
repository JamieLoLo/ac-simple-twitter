import styles from './TweetItem.module.scss'
// --- hook
import useMoment from '../hooks/useMoment'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
// --- component
// --- api
import { likeApi, unLikeApi } from '../api/likeApi'
import { userGetProfileApi } from '../api/userApi'
// --- store
import { userActions } from '../store/user-slice'
import { modalActions } from '../store/modal-slice'
// --- icons
import {
  likeIcon,
  likeActiveIcon,
  defaultFig,
} from '../components/assets/icons/index'

const TweetItem = ({ data, onClick }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id, User, createdAt, description, isLiked, likeCounts, replyCounts } =
    data
  // --- localStorage
  const authToken = localStorage.getItem('authToken')
  // --- useSelector
  // const isReplyModalOpen = useSelector((state) => state.modal.isReplyModalOpen)
  // --- event handler
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
    try {
      localStorage.setItem('profile_id', User.id)
      navigate('/users/profile')
    } catch (error) {
      console.error(error)
    }
  }

  // --- helper constant
  const createTime = useMoment(createdAt)

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
