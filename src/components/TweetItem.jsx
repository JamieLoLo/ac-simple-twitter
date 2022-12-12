import styles from './TweetItem.module.scss'
import moment from 'moment'
import useMoment from '../hooks/useMoment'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import likeIcon from '../components/assets/icons/like.svg'
import likeActiveIcon from '../components/assets/icons/like_active.svg'
import { useState } from 'react'

const DetailTweetItem = ({ isFollowed, onClick }) => {
  const [replyModal, setReplyModal] = useState(false)
  useMoment()
  const timestamp = moment().valueOf()
  const currentTime = moment(timestamp).format(
    'Ah:mm:ss[・]YYYY[年]MM[月]DD[日]'
  )
  return (
    <div className={styles.tweet}>
      <div className={styles.tweetInfo}>
        <img className={styles.avatar} src={defaultFig} alt='Default Fig' />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name}>Apple</div>
            <div className={styles.account}>@apple</div>
          </div>
          <div className={styles.createTime}>・{currentTime}</div>
        </div>
      </div>
      <div className={styles.tweetContent}>
        哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </div>

      <div className={styles.tweetFeedback}>
        <div className={styles.reply} onClick={() => onClick?.(true)}>
          <div className={styles.messageIcon}></div>
          <div className={styles.num}>13</div>
        </div>
        <div className={styles.like}>
          {isFollowed ? (
            <img
              className={styles.likeIcon}
              src={likeActiveIcon}
              alt='like_active'
            />
          ) : (
            <img className={styles.likeIcon} src={likeIcon} alt='like' />
          )}

          <div className={styles.num}>808</div>
        </div>
      </div>
    </div>
  )
}

export default DetailTweetItem
