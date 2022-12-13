import styles from './ReplyItem.module.scss'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import useMoment from '../hooks/useMoment'
const ReplyItem = ({ data }) => {
  const { User, comment, createdAt, Tweet } = data
  // const data = {
  //   Tweet: { User: { id: 14, account: 'user1' }, id: 4, TweetId: 4 },
  //   User: {
  //     account: 'user1',
  //     name: 'User1',
  //     avatar: 'https://loremflickr.com/320/240/logo/?lock=1',
  //   },
  //   UserId: 14,
  //   comment: '',
  //   createdAt: '2022-12-10T08:08:53.000Z',
  //   id: 4,
  //   updatedAt: '2022-12-10T08:08:53.000Z',
  // }

  const createTime = useMoment(createdAt)
  return (
    <div className={styles.replyItem}>
      <div className={styles.tweetInfo}>
        <img
          className={styles.avatar}
          src={User.avatar ? User.avatar : defaultFig}
          alt='avatar'
        />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name}>{User.name}</div>
            <div className={styles.account}>@{User.account}</div>
          </div>
          <div className={styles.createTime}>・{createTime}</div>
        </div>
      </div>
      <div className={styles.tweetContent}>
        <div className={styles.replyTo}>
          回覆給<span className={styles.highlight}> @{Tweet.User.account}</span>
        </div>
        {comment}
      </div>
    </div>
  )
}

export default ReplyItem
