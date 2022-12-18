import styles from './AdminUserItem.module.scss'
import defaultCover from './assets/icons/cover.svg'
import defaultAvatar from './assets/icons/defaultAvatar.svg'

const AdminUserItem = ({ data }) => {
  const {
    account,
    name,
    avatar,
    cover,
    tweetCounts,
    likeCounts,
    followingCounts,
    followerCounts,
  } = data
  return (
    <div className={styles.userCard}>
      <img
        className={styles.cover}
        src={cover ? cover : defaultCover}
        alt='cover'
      />
      <img
        className={styles.avatar}
        src={avatar ? avatar : defaultAvatar}
        alt='avatar'
      />
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.account}>@{account}</div>
        <div className={styles.tweetInfo}>
          <div className={styles.tweetNum}>
            <div className={styles.icon}></div>
            <div className={styles.num}>{tweetCounts}</div>
          </div>
          <div className={styles.likeNum}>
            <div className={styles.icon}></div>
            <div className={styles.num}>{likeCounts}</div>
          </div>
        </div>
        <div className={styles.followInfo}>
          <p>
            {followingCounts} 個<span className={styles.sub}>跟隨中</span>
          </p>

          <p>
            {followerCounts} 位<span className={styles.sub}>跟隨者</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminUserItem
