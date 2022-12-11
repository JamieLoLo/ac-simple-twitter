import styles from './AdminTweetItem.module.scss'
import useMoment from '../hooks/useMoment'
import defaultCover from './assets/icons/cover.svg'
import defaultAvatar from './assets/icons/defaultAvatar.svg'

const AdminTweetItem = ({ data }) => {
  const { description, createdAt, User } = data
  const { account, name, avatar } = User
  const time = useMoment(createdAt)
  return (
    <div className={styles.tweet}>
      <div className={styles.tweetInfo}>
        <img
          className={styles.avatar}
          src={avatar ? avatar : defaultAvatar}
          alt='avatar'
        />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name}>{name}</div>
            <div className={styles.account}>@{account}</div>
          </div>
          <div className={styles.createTime}>・{time}</div>
        </div>
      </div>
      <div className={styles.tweetContent}>{description}</div>
      <div className={styles.delBtn}></div>
    </div>
  )
}

export default AdminTweetItem
