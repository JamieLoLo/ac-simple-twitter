import styles from './ReplyItem.module.scss'
import defaultFig from '../components/assets/icons/defaultFig.svg'
const ReplyItem = ({ comment, name, account }) => {
  const currentTime = '上午 10:05・2021年11月10日'
  return (
    <div className={styles.replyItem}>
      <div className={styles.tweetInfo}>
        <img className={styles.avatar} src={defaultFig} alt='Default Fig' />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name}>{name}</div>
            <div className={styles.account}>{account}</div>
          </div>
          <div className={styles.createTime}>・{currentTime}</div>
        </div>
      </div>
      <div className={styles.tweetContent}>
        <div className={styles.replyTo}>
          回覆給<span className={styles.highlight}> @apple</span>
        </div>
        {comment}
      </div>
    </div>
  )
}

export default ReplyItem
