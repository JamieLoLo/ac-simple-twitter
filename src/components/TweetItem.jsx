import styles from './TweetItem.module.scss'
import useMoment from '../hooks/useMoment'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import likeIcon from '../components/assets/icons/like.svg'
import likeActiveIcon from '../components/assets/icons/like_active.svg'
import { useState } from 'react'

const TweetItem = ({ data, onClick }) => {
  const [replyModal, setReplyModal] = useState(false)
  const {
    User,
    createdAt,
    description,
    isLiked,
    likeCounts,
    replyCounts,
    likesCount,
    repliesCount,
  } = data
  const createTime = useMoment(createdAt)

  return (
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
      <div className={styles.tweetContent}>{description}</div>

      <div className={styles.tweetFeedback}>
        <div className={styles.reply} onClick={() => onClick?.(true)}>
          <div className={styles.messageIcon}></div>
          <div className={styles.num}>{replyCounts || repliesCount || 0}</div>
        </div>
        <div className={styles.like}>
          {isLiked ? (
            <img
              className={styles.likeIcon}
              src={likeActiveIcon}
              alt='like_active'
            />
          ) : (
            <img className={styles.likeIcon} src={likeIcon} alt='like' />
          )}

          <div className={styles.num}>{likeCounts || likesCount || 0}</div>
        </div>
      </div>
    </div>
  )
}

export default TweetItem
