import styles from './TweetItem.module.scss'
import useMoment from '../hooks/useMoment'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import likeIcon from '../components/assets/icons/like.svg'
import likeActiveIcon from '../components/assets/icons/like_active.svg'
import { useState } from 'react'

// 這個有問題!!!勿觸

export const MainTweetItem = ({ data, onClick }) => {
  const [replyModal, setReplyModal] = useState(false)
  const values = Object.values(data)
  const keys = Object.keys(data).map((data) => data.replace('.', ''))

  const allTweetsData = {}
  for (let i = 0; i < keys.length; i++) {
    allTweetsData[keys[i]] = values[i]
  }
  const {
    UserId,
    Useraccount,
    Useravatar,
    Userid,
    Username,
    createdAt,
    description,
    id,
    isLiked,
    likeCounts,
    replyCounts,
  } = allTweetsData
  const createTime = useMoment(createdAt)

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetInfo}>
        <img
          className={styles.avatar}
          src={Useravatar === null ? defaultFig : Useravatar}
          alt='Default Fig'
        />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name}>{Username}</div>
            <div className={styles.account}>@{Useraccount}</div>
          </div>
          <div className={styles.createTime}>・{createTime}</div>
        </div>
      </div>
      <div className={styles.tweetContent}>{description}</div>

      <div className={styles.tweetFeedback}>
        <div className={styles.reply} onClick={() => onClick?.(true)}>
          <div className={styles.messageIcon}></div>
          <div className={styles.num}>{replyCounts}</div>
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

          <div className={styles.num}>{likeCounts}</div>
        </div>
      </div>
    </div>
  )
}

export const ProfileTweetItem = ({ data, onClick }) => {
  const { User, createdAt, description, isLiked, likeCounts, repliesCount } =
    data
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
          <div className={styles.num}>{repliesCount}</div>
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

          <div className={styles.num}>{likeCounts}</div>
        </div>
      </div>
    </div>
  )
}
