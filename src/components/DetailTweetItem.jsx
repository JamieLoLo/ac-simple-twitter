import styles from './DetailTweetItem.module.scss'
import moment from 'moment'
import useMoment from '../hooks/useMoment'
import defaultFig from '../components/assets/icons/defaultFig.svg'

const DetailTweetItem = ({ description }) => {
  useMoment()
  const timestamp = moment().valueOf()
  const currentTime = moment(timestamp).format(
    'Ah:mm:ss[・]YYYY[年]MM[月]DD[日]'
  )

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetInfo}>
        <img className={styles.avatar} src={defaultFig} alt='Default Fig' />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.name}>Apple</div>
          <div className={styles.account}>@apple</div>
        </div>
      </div>
      <div className={styles.tweetContent}>{description}</div>
      <div className={styles.createTime}>{currentTime}</div>
      <div className={styles.tweetFeedback}>
        <div className={styles.num}>
          34
          <p>回覆</p>
        </div>
        <div className={styles.num}>
          808
          <p>喜歡次數</p>
        </div>
      </div>

      <div className={styles.actionIcons}>
        <div className={styles.messageIcon}></div>
        <div className={styles.likeIcon}></div>
      </div>
    </div>
  )
}

export default DetailTweetItem
