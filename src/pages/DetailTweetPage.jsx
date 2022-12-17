import styles from './DetailTweetPage.module.scss'
import prevIcon from '../components/assets/icons/prev.svg'
import { UserGrid } from '../Layout/GridSystemWrapper'
import DetailTweetItem from '../components/DetailTweetItem'
import { tweetGetOneApi, replyGetOneApi } from '../api/tweetApi'
import DetailReplyItem from '../components/DetailReplyItem'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DetailReplyModal from '../UI/DetailReplyModal'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ReactComponent as LoadingIcon } from '../components/assets/icons/loading.svg'

const DetailTweetPage = () => {
  const navigate = useNavigate()
  // --- localStorage
  const authToken = localStorage.getItem('authToken')
  const replyId = localStorage.getItem('reply_id')
  const tweetId = localStorage.getItem('tweet_id')
  // --- useState
  const [tweetData, setTweetData] = useState([])
  const [tweetUserData, setTweetUserData] = useState([])
  const [replyData, setReplyData] = useState([])
  const [detailReplyModal, setDetailReplyModal] = useState(false)
  // --- useSelector
  const likeCount = useSelector((state) => state.user.likeCount)

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [submitReRender, setSubmitReRender] = useState(false)
  // --- useEffect
  useEffect(() => {
    if (authToken === null) {
      navigate('/users/login')
    }
  }, [])

  useEffect(() => {
    const tweetGetOne = async () => {
      try {
        const res = await tweetGetOneApi(tweetId)
        setTweetData(res.data)
        setTweetUserData(res.data.User)
      } catch (error) {
        console.error(error)
      }
    }
    if (tweetId !== null) {
      tweetGetOne()
    }
  }, [likeCount, navigate, tweetId, replyId])

  // 取得單一推文的回覆列表

  const replyGetOne = async (tweetId, page) => {
    try {
      const res = await replyGetOneApi(tweetId, page)
      await setReplyData(res.data)
    } catch (error) {
      console.error(error)
      localStorage.clear()
      navigate('/users/login')
    }
  }

  useEffect(() => {
    replyGetOne(tweetId, 1)
    setPage(2)
    setSubmitReRender(false)
  }, [replyId, navigate, tweetId, submitReRender])

  // lazy loading for reply list

  const changeReplyPage = () => {
    const replyGetOne = async () => {
      try {
        const res = await replyGetOneApi(tweetId, page)
        setHasMore(res.data.length)
        await setReplyData(replyData.concat(res.data))
        setPage((page) => page + 1)
      } catch (error) {
        console.error(error)
      }
    }
    replyGetOne()
  }

  const replyItemHelper = replyData.map((data) => (
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
        tweetData={tweetData}
        tweetUserData={tweetUserData}
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
          tweetData={tweetData}
          tweetUserData={tweetUserData}
          setReplyModal={setDetailReplyModal}
          onClick={(replyModal) => setDetailReplyModal(replyModal)}
        />
        {replyData.length !== 0 && (
          <InfiniteScroll
            dataLength={replyData.length}
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
