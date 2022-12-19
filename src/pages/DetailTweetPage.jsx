import styles from './DetailTweetPage.module.scss'
// --- hook
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
// --- component
import { UserGrid } from '../Layout/GridSystemWrapper'
import DetailTweetItem from '../components/DetailTweetItem'
import DetailReplyItem from '../components/DetailReplyItem'
import DetailReplyModal from '../UI/DetailReplyModal'
// --- api
import { tweetGetOneApi, replyGetOneApi } from '../api/tweetApi'
// --- store
import { userActions } from '../store/user-slice'
// --- icons
import { prevIcon } from '../components/assets/icons/index'
import { ReactComponent as LoadingIcon } from '../components/assets/icons/loading.svg'

const DetailTweetPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // --- localStorage
  const authToken = localStorage.getItem('authToken')
  const replyId = Number(localStorage.getItem('reply_id'))
  const tweetId = Number(localStorage.getItem('tweet_id'))
  // --- useState
  const [tweetUserData, setTweetUserData] = useState([])
  const [detailReplyModal, setDetailReplyModal] = useState(false)
  const [tweetUserId, setTweetUserId] = useState()
  // --- useSelector
  const likeCount = useSelector((state) => state.user.likeCount)
  const oneTweetData = useSelector((state) => state.user.oneTweetData)
  const replysForOneTweet = useSelector((state) => state.user.replysForOneTweet)
  // --- lazy loading related
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [submitReRender, setSubmitReRender] = useState(false)
  // 取得單一推文的回覆列表
  const replyGetOne = useCallback(async (tweetId, page) => {
    try {
      const res = await replyGetOneApi(tweetId, page)
      await dispatch(userActions.setReplysForOneTweet(res.data))
    } catch (error) {
      console.error(error)
    }
  },[dispatch])
  // lazy loading for reply list
  const changeReplyPage = async () => {
    try {
      const res = await replyGetOneApi(tweetId, page)
      setHasMore(res.data.length)
      await dispatch(
        userActions.setReplysForOneTweet(replysForOneTweet.concat(res.data))
      )
      setPage((page) => page + 1)
    } catch (error) {
      console.error(error)
    }
  }
  // --- useEffect
  useEffect(() => {
    if (authToken === null) {
      navigate('/users/login')
    }
  }, [authToken, navigate])

  useEffect(() => {
    const tweetGetOne = async () => {
      try {
        const res = await tweetGetOneApi(tweetId)
        dispatch(userActions.setOneTweetData(res.data))
        setTweetUserData(res.data.User)
        setTweetUserId(res.data.UserId)
      } catch (error) {
        console.error(error)
      }
    }
    if (tweetId !== null) {
      tweetGetOne()
    }
  }, [likeCount, tweetId, replyId, dispatch])

  useEffect(() => {
    replyGetOne(tweetId, 1)
    setPage(2)
    setSubmitReRender(false)
  }, [replyId, tweetId, submitReRender])
  // --- helper const
  const replyItemHelper = replysForOneTweet.map((data) => (
    <DetailReplyItem
      replyData={data}
      tweetUserData={tweetUserData}
      key={data.id}
    />
  ))

  return (
    <>
      <DetailReplyModal
        trigger={detailReplyModal}
        setDetailReplyModal={setDetailReplyModal}
        tweetData={oneTweetData}
        tweetUserData={tweetUserData}
        tweetUserId={tweetUserId}
        setSubmitReRender={setSubmitReRender}
      />
      <UserGrid id={'reply__list'}>
        <div className={styles.title}>
          <img
            src={prevIcon}
            alt='prev'
            onClick={() => navigate('/users/main')}
          />
          推文
        </div>
        <DetailTweetItem
          tweetData={oneTweetData}
          tweetUserData={tweetUserData}
          tweetUserId={tweetUserId}
          setReplyModal={setDetailReplyModal}
          onClick={(replyModal) => setDetailReplyModal(replyModal)}
        />
        {replysForOneTweet.length !== 0 && (
          <InfiniteScroll
            dataLength={replysForOneTweet.length}
            next={changeReplyPage}
            hasMore={hasMore !== 0}
            loader={<LoadingIcon className={styles.loading__icon} />}
            endMessage={null}
            scrollableTarget='tweet__list'
            height={600}
          >
            {replyItemHelper}
          </InfiniteScroll>
        )}
      </UserGrid>
    </>
  )
}

export default DetailTweetPage
