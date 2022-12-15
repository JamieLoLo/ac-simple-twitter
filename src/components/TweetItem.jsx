import styles from './TweetItem.module.scss'
import useMoment from '../hooks/useMoment'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import likeIcon from '../components/assets/icons/like.svg'
import likeActiveIcon from '../components/assets/icons/like_active.svg'
import { useNavigate } from 'react-router-dom'
import { likeApi, unLikeApi } from '../api/likeApi'
import { useDispatch } from 'react-redux'
import { userActions } from '../store/user-slice'
import { useState } from 'react'
import ReplyModal from '../UI/ReplyModal'

const TweetItem = ({ tweetData, onClick }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [replyModal, setReplyModal] = useState(false)
  const { id, User, createdAt, description, isLiked, likeCounts, replyCounts } =
    tweetData

  const createTime = useMoment(createdAt)

  const toDetailPage = () => {
    const token = localStorage.getItem('authToken')
    if (token) {
      navigate('/users/tweet')
      localStorage.setItem('tweet_id', id)
    }
  }
  const likeHandler = async () => {
    if (isLiked === true) {
      await unLikeApi(id)
      await dispatch(userActions.setIsUpdate())
      return
    }
    await likeApi(id)
    await dispatch(userActions.setIsUpdate())
  }
  const replyHandler = () => {
    localStorage.setItem('tweet_user_avatar', User.avatar)
    localStorage.setItem('tweet_user_name', User.name)
    localStorage.setItem('tweet_user_account', User.account)
    localStorage.setItem('tweet_description', description)
    localStorage.setItem('tweet_createdAt', createdAt)
    localStorage.setItem('tweet_id', id)
    onClick?.(true)
  }

  return (
    <>
      <div className={styles.tweet}>
        <div className={styles.tweetInfo}>
          <img
            className={styles.avatar}
            src={User.avatar === null ? defaultFig : User.avatar}
            alt='Default Fig'
          />
          <div className={styles.tweetCreatorInfo}>
            <div className={styles.container}>
              <div className={styles.name}>{User.name}</div>
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
          <div className={styles.like} onClick={likeHandler}>
            {isLiked ? (
              <img
                className={styles.likeIcon}
                src={likeActiveIcon}
                alt='like_active'
              />
            ) : (
              <img className={styles.likeIcon} src={likeIcon} alt='like' />
            )}
            <div className={styles.num}>{likeCounts || 0}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TweetItem
