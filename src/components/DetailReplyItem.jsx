import styles from './DetailReplyItem.module.scss'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import useMoment from '../hooks/useMoment'
const DetailReplyItem = ({ data }) => {
  const tweetUserAccount = localStorage.getItem('tweet_user_account')
  const createTime = useMoment(data.createdAt)
  return (
    <div className={styles.replyItem}>
      <div className={styles.tweetInfo}>
        <img className={styles.avatar} src={defaultFig} alt='Default Fig' />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name}>{data.User.name}</div>
            <div className={styles.account}>{data.User.account}</div>
          </div>
          <div className={styles.createTime}>・{createTime}</div>
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

export default DetailReplyItem
