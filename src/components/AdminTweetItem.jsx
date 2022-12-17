import styles from './AdminTweetItem.module.scss'
import useMoment from '../hooks/useMoment'
import defaultAvatar from './assets/icons/defaultAvatar.svg'
import { AdminDeleteTweetApi } from '../api/adminApi'
import { adminActions } from '../store/admin-slice'
import { useDispatch } from 'react-redux'

const AdminTweetItem = (props) => {
  const dispatch = useDispatch()
  const { description, createdAt, User, id } = props.data
  const currentTime = useMoment(createdAt)

  // 管理員刪除一則貼文
  const deleteHandler = async () => {
    await AdminDeleteTweetApi(id) // send request for delete one tweet
    await dispatch(adminActions.setIsAllTweetsUpdate()) // 發出 allTweets 要改變的訊號
  }

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetInfo}>
        <img
          className={styles.avatar}
          src={User.avatar ? User.avatar : defaultAvatar}
          alt='avatar'
        />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name}>{User.name}</div>
            <div className={styles.account}>@{User.account}</div>
          </div>
          <div className={styles.createTime}>・{currentTime}</div>
        </div>
      </div>
      <div className={styles.tweetContent}>{description}</div>
      <div className={styles.delBtn} onClick={deleteHandler}></div>
    </div>
  )
}

export default AdminTweetItem
