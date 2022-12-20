import styles from './ReplyItem.module.scss'
// --- hook
import useMoment from '../hooks/useMoment'
// --- icons
import { defaultFig } from '../components/assets/icons/index'

const ReplyItem = (props) => {
  const { User, comment, createdAt, Tweet } = props.data
  // helper constant
  const createTime = useMoment(createdAt)

  return (
    <div className={styles.replyItem}>
      <div className={styles.tweetInfo}>
        <img
          className={styles.avatar}
          src={User.avatar ? User.avatar : defaultFig}
          alt='avatar'
        />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name}>{User.name}</div>
            <div className={styles.account}> @{User.account}</div>
          </div>
          <div className={styles.createTime}>・{createTime}</div>
        </div>
      </div>
      <div className={styles.tweetContent}>
        <div className={styles.replyTo}>
          回覆給<span className={styles.highlight}> @{Tweet.User.account}</span>
        </div>
        {comment}
      </div>
    </div>
  )
}

export default ReplyItem
