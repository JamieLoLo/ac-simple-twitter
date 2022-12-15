import styles from './DetailReplyItem.module.scss'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import useMoment from '../hooks/useMoment'
const DetailReplyItem = ({ replyData, tweetUserData }) => {
  const createTime = useMoment(replyData.createdAt)
  console.log(replyData)
  return (
    <div className={styles.replyItem}>
      <div className={styles.tweetInfo}>
        <img
          className={styles.avatar}
          src={
            replyData.User.avatar === null ? defaultFig : replyData.User.avatar
          }
          alt='Default Fig'
        />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name}>{replyData.User.name}</div>
            <div className={styles.account}>{replyData.User.account}</div>
          </div>
          <div className={styles.createTime}>・{createTime}</div>
        </div>
      </div>
      <div className={styles.tweetContent}>
        <div className={styles.replyTo}>
          回覆給
          <span className={styles.highlight}> @{tweetUserData.account}</span>
        </div>
        {replyData.comment}
      </div>
    </div>
  )
}

export default DetailReplyItem
