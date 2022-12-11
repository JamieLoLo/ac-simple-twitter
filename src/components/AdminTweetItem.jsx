import styles from './AdminTweetItem.module.scss'
import defaultFig from '../components/assets/icons/defaultFig.svg'

const AdminTweetItem = ({ data }) => {
  const { description, createdAt, User } = data
  const { account, name, avatar } = User
  return (
    <div className={styles.tweet}>
      <div className={styles.tweetInfo}>
        <img className={styles.avatar} src={avatar} alt='avatar' />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name}>{name}</div>
            <div className={styles.account}>@{account}</div>
          </div>
          <div className={styles.createTime}>・下午4:54:09・2022年12月11日</div>
        </div>
      </div>
      <div className={styles.tweetContent}>{description}</div>
      <div className={styles.delBtn}></div>
    </div>
  )
}

export default AdminTweetItem
