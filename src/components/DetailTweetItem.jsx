import styles from './DetailTweetItem.module.scss'
import moment from 'moment'
import useMoment from '../hooks/useMoment'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import { useState, useEffect } from 'react'
import { likeApi, unLikeApi } from '../api/likeApi'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../store/user-slice'

const DetailTweetItem = ({ tweetData, tweetUserData, onClick }) => {
  const [replyModal, setReplyModal] = useState(false)
  const [likeData, setLikeData] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const likeCount = useSelector((state) => state.user.likeCount)
  useMoment()
  const timestamp = moment().valueOf()

  const currentTime = moment(timestamp).format(
    'Ah:mm:ss[・]YYYY[年]MM[月]DD[日]'
  )
  const likeCountHandler = (count) => {
    dispatch(userActions.changeLikeCount(count))
  }

  const likeHandler = () => {
    if (tweetData.isLiked === false) {
      const like = async () => {
        try {
          const res = await likeApi(504)
          setLikeData(res.data)
          likeCountHandler(res.data.isLiked)
          console.log(res.data)
        } catch (error) {
          console.error(error)
        }
      }
      like()
    } else if (tweetData.isLiked === true) {
      const unLike = async () => {
        try {
          const res = await unLikeApi(504)
          setLikeData(res.data.isLiked)
          likeCountHandler(res.data.isLiked)
          console.log(res.data)
        } catch (error) {
          console.error(error)
        }
      }
      unLike()
    }
  }

  return (
    <div className={styles.tweet}>
      <div className={styles.tweet__info}>
        <img className={styles.avatar} src={defaultFig} alt='Default Fig' />
        <div className={styles.tweet__creator__info}>
          <div className={styles.name}>{tweetUserData.name}</div>
          <div className={styles.account}> @{tweetUserData.account}</div>
        </div>
      </div>
      <div className={styles.tweet__content}>{tweetData.description}</div>
      <div className={styles.create__time}>{currentTime}</div>
      <div className={styles.tweet__feedback}>
        <div className={styles.num}>
          {tweetData.reply__counts}
          <p>回覆</p>
        </div>
        <div className={styles.num}>
          {tweetData.likeCounts}
          <p>喜歡次數</p>
        </div>
      </div>

      <div className={styles.action__icons}>
        <div
          className={styles.message__icon}
          onClick={() => onClick?.(true)}
        ></div>
        {tweetData.isLiked === true && (
          <div
            className={styles.like__icon__active}
            onClick={() => {
              likeHandler()
              onClick?.(likeCount)
            }}
          ></div>
        )}
        {tweetData.isLiked === false && (
          <div
            className={styles.like__icon}
            onClick={() => {
              likeHandler()
              onClick?.(likeCount)
            }}
          ></div>
        )}
      </div>
    </div>
  )
}

export default DetailTweetItem
