import styles from './AdminTweetItem.module.scss'
import useMoment from '../hooks/useMoment'
import defaultAvatar from './assets/icons/defaultAvatar.svg'
import { AdminDeleteTweetApi } from '../api/adminApi'
import { userActions } from '../store/user-slice'
import { useDispatch } from 'react-redux'

const AdminTweetItem = ({ data }) => {
  const { description, createdAt, User, id } = data
  const { account, name, avatar } = User
  const dispatch = useDispatch();
  const time = useMoment(createdAt)
  const deleteHandler = async () => {
    await AdminDeleteTweetApi(id)
    await dispatch(userActions.setIsUpdate())
  }
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
      <div className={styles.delBtn} onClick={deleteHandler}></div>
    </div>
  )
}

export default AdminTweetItem
