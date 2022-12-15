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

const DetailTweetPage = () => {
  const [tweetData, setTweetData] = useState([])
  const [tweetUserData, setTweetUserData] = useState([])
  const [replyData, setReplyData] = useState([])
  const [detailReplyModal, setDetailReplyModal] = useState(false)
  const likeCount = useSelector((state) => state.user.likeCount)
  const navigate = useNavigate()
  const replyId = localStorage.getItem('reply_id')
  useEffect(() => {
    const tweetGetOne = async () => {
      try {
        const tweetId = localStorage.getItem('tweet_id')
        const res = await tweetGetOneApi(tweetId)
        setTweetData(res.data)
        setTweetUserData(res.data.User)
      } catch (error) {
        console.error(error)
        localStorage.removeItem('tweet_id')
        navigate('/users/login')
        localStorage.removeItem('authToken')
      }
    }
    tweetGetOne()
  }, [likeCount, navigate])

  useEffect(() => {
    const tweetId = localStorage.getItem('tweet_id')
    const replyGetOne = async () => {
      try {
        const res = await replyGetOneApi(tweetId)
        setReplyData(res.data)
      } catch (error) {
        console.error(error)
        localStorage.removeItem('tweet_id')
        navigate('/users/login')
        localStorage.removeItem('authToken')
      }
    }
    replyGetOne()
  }, [replyId, navigate])
  console.log(replyId)

  const replyItemHelper = replyData.map((data) => (
    <DetailReplyItem replyData={data} tweetUserData={tweetUserData} />
  ))

  return (
    <>
      <DetailReplyModal
        trigger={detailReplyModal}
        setDetailReplyModal={setDetailReplyModal}
        tweetData={tweetData}
        tweetUserData={tweetUserData}
      />
      <UserGrid>
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
        {replyItemHelper}
      </UserGrid>
    </>
  )
}

export default DetailTweetPage
