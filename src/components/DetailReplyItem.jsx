import styles from './DetailReplyItem.module.scss'
// --- hook
import { useNavigate } from 'react-router-dom'
import useMoment from '../hooks/useMoment'
// --- api
// --- store
// --- icons
import { defaultFig } from '../components/assets/icons/index'

const DetailReplyItem = (props) => {
  const { replyData, tweetUserData } = props
  const navigate = useNavigate()
  const userId = Number(localStorage.getItem('userId'))
  const changeProfilePageHandler = () => {
    localStorage.setItem('profile_id', replyData.UserId)
    if (replyData.UserId === userId) {
      navigate('/users/profile')
      return
    }
    navigate('/users/profile/other')
  }
  // helper constant
  const createTime = useMoment(replyData.createdAt)
  return (
    <div className={styles.replyItem}>
      <div className={styles.tweetInfo}>
        <img
          className={styles.avatar}
          src={
            replyData.User.avatar === null ? defaultFig : replyData.User.avatar
          }
          alt='Default Fig'
          onClick={changeProfilePageHandler}
        />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name} onClick={changeProfilePageHandler}>
              {replyData.User.name}
            </div>
            <div className={styles.account} onClick={changeProfilePageHandler}>
              {replyData.User.account}
            </div>
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
