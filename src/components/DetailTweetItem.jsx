import styles from './DetailTweetItem.module.scss'
import useMoment from '../hooks/useMoment'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import { useState } from 'react'
import { likeApi, unLikeApi } from '../api/likeApi'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../store/user-slice'

const DetailTweetItem = ({ tweetData, tweetUserData, onClick }) => {
  const [likeData, setLikeData] = useState()
  const dispatch = useDispatch()
  const likeCount = useSelector((state) => state.user.likeCount)
  const createTime = useMoment(tweetData.createdAt)
  const [countForRender, serCountForRender] = useState(likeCount)
  const likeCountHandler = (count) => {
    dispatch(userActions.changeLikeCount(count))
  }
  const tweetId = tweetData.id

  const likeHandler = () => {
    if (tweetData.isLiked === 0) {
      const like = async () => {
        try {
          const res = await likeApi(tweetId)
          setLikeData(res.data)
          likeCountHandler(res.data.isLiked)
        } catch (error) {
          console.error(error)
        }
      }
      like()
    } else if (tweetData.isLiked === 1) {
      const unLike = async () => {
        try {
          const res = await unLikeApi(tweetId)
          setLikeData(res.data.isLiked)
          likeCountHandler(res.data.isLiked)
        } catch (error) {
          console.error(error)
        }
      }
      unLike()
    }
  }
  console.log(tweetData)

  return (
    <div className={styles.tweet}>
      <div className={styles.tweet__info}>
        <img
          className={styles.avatar}
          src={
            tweetUserData.avatar === null ? defaultFig : tweetUserData.avatar
          }
          alt='Default Fig'
        />
        <div className={styles.tweet__creator__info}>
          <div className={styles.name}>{tweetUserData.name}</div>
          <div className={styles.account}> @{tweetUserData.account}</div>
        </div>
      </div>
      <div className={styles.tweet__content}>{tweetData.description}</div>
      <div className={styles.create__time}>{createTime}</div>
      <div className={styles.tweet__feedback}>
        <div className={styles.num}>
          {tweetData.replyCounts}
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
          onClick={() => {
            onClick?.(true)
          }}
        ></div>
        {tweetData.isLiked === 1 && (
          <div
            className={styles.like__icon__active}
            onClick={() => {
              likeHandler()
            }}
          ></div>
        )}
        {tweetData.isLiked === 0 && (
          <div
            className={styles.like__icon}
            onClick={() => {
              likeHandler()
            }}
          ></div>
        )}
      </div>
    </div>
  )
}

export default DetailTweetItem
