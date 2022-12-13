import styles from './ReplyItem.module.scss'
import defaultFig from '../components/assets/icons/defaultFig.svg'
const ReplyItem = ({ data }) => {
  const currentTime = '上午 10:05・2021年11月10日'
  const tweetUserAccount = localStorage.getItem('tweet_user_account')

  return (
    <div className={styles.replyItem}>
      <div className={styles.tweetInfo}>
        <img className={styles.avatar} src={defaultFig} alt='Default Fig' />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name}>{data.User.name}</div>
            <div className={styles.account}>{data.User.account}</div>
          </div>
          <div className={styles.createTime}>・{currentTime}</div>
        </div>
      </div>
      <div className={styles.tweetContent}>
        <div className={styles.replyTo}>
          回覆給<span className={styles.highlight}> @{tweetUserAccount}</span>
        </div>
        {data.comment}
      </div>
    </div>
  )
}

export default ReplyItem
