import styles from './DetailTweetItem.module.scss'
// --- hook
import useMoment from '../hooks/useMoment'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
// --- api
import { likeApi, unLikeApi } from '../api/likeApi'
// --- store
import { userActions } from '../store/user-slice'
import { modalActions } from '../store/modal-slice'
// --- icons
import { defaultFig } from '../components/assets/icons/index'

const DetailTweetItem = (props) => {
  const { tweetData, tweetUserData, tweetUserId } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // --- localStorage
  const tweetId = Number(localStorage.getItem('tweet_id'))
  const userId = Number(localStorage.getItem('userId'))
  // --- useState
  const [activeColor, setActiveColor] = useState(tweetData.isLiked)
  const [likeCounts, setLikeCounts] = useState(tweetData.likeCounts)
  // --- useSelector
  // --- useEffect
  useEffect(() => {
    setActiveColor(tweetData.isLiked)
    setLikeCounts(tweetData.likeCounts)
  }, [tweetData.isLiked, tweetData.likeCounts])
  // event handler
  const likeCountHandler = (count) => {
    dispatch(userActions.changeLikeCount(count))
  }
  const likeHandler = () => {
    setActiveColor(!activeColor)
    if (!activeColor) {
      setLikeCounts((count) => count + 1)
    } else {
      setLikeCounts((count) => count - 1)
    }
    if (!tweetData.isLiked) {
      const like = async () => {
        try {
          const res = await likeApi(tweetId)
          likeCountHandler(res.data.isLiked)
        } catch (error) {
          console.error(error)
        }
      }
      like()
    } else if (tweetData.isLiked) {
      const unLike = async () => {
        try {
          const res = await unLikeApi(tweetId)
          likeCountHandler(res.data.isLiked)
        } catch (error) {
          console.error(error)
        }
      }
      unLike()
    }
  }
  const changeProfilePageHandler = () => {
    localStorage.setItem('profile_id', tweetUserId)
    if (tweetUserId === userId) {
      navigate('/users/profile')
      return
    }
    navigate('/users/profile/other')
  }

  // --- helper constant
  const createTime = useMoment(tweetData.createdAt)
  return (
    <div className={styles.tweet}>
      <div className={styles.tweet__info}>
        <img
          className={styles.avatar}
          src={
            tweetUserData.avatar === null ? defaultFig : tweetUserData.avatar
          }
          alt='Avatar'
          onClick={changeProfilePageHandler}
        />
        <div className={styles.tweet__creator__info}>
          <div className={styles.name} onClick={changeProfilePageHandler}>
            {tweetUserData.name}
          </div>
          <div className={styles.account} onClick={changeProfilePageHandler}>
            @{tweetUserData.account}
          </div>
        </div>
      </div>
      <div className={styles.tweet__content}>{tweetData.description}</div>
      <div className={styles.create__time}>{createTime}</div>
      <div className={styles.tweet__feedback}>
        <div className={styles.num}>
          {tweetData.replyCounts}
          <p>??????</p>
        </div>
        <div className={styles.num}>
          {likeCounts}
          <p>????????????</p>
        </div>
      </div>

      <div className={styles.action__icons}>
        <div
          className={styles.message__icon}
          onClick={() => {
            dispatch(modalActions.setIsDetailReplyModalOpen(true))
          }}
        ></div>
        {activeColor ? (
          <div
            className={styles.like__icon__active}
            onClick={() => {
              likeHandler()
            }}
          ></div>
        ) : (
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
