import styles from './DetailTweetPage.module.scss'
import prevIcon from '../components/assets/icons/prev.svg'
import { UserGrid } from '../Layout/GridSystemWrapper'
import DetailTweetItem from '../components/DetailTweetItem'
import { tweetGetOneApi, replyGetOneApi } from '../api/tweetApi'
import DetailReplyItem from '../components/DetailReplyItem'
import ReplyModal from '../UI/ReplyModal'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DetailTweetPage = () => {
  const [tweetData, setTweetData] = useState([])
  const [tweetUserData, setTweetUserData] = useState([])
  const [replyData, setReplyData] = useState([])
  const [replyModal, setReplyModal] = useState(false)
  const [replyId, setReplyId] = useState(null)
  const likeCount = useSelector((state) => state.user.likeCount)
  const navigate = useNavigate()

  useEffect(() => {
    const tweetGetOne = async () => {
      try {
        const tweetId = localStorage.getItem('tweet_id')
        const res = await tweetGetOneApi(tweetId)
        setTweetData(res.data)
        setTweetUserData(res.data.User)
        localStorage.setItem('tweet_user_account', res.data.User.account)
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

  const replyItemHelper = replyData.map((data) => (
    <DetailReplyItem data={data} />
  ))

  return (
    <>
      <ReplyModal
        trigger={replyModal}
        setReplyModal={setReplyModal}
        tweetData={tweetData}
        tweetUserData={tweetUserData}
        setReplyId={setReplyId}
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
          setReplyModal={setReplyModal}
          onClick={(replyModal) => setReplyModal(replyModal)}
        />
        {replyItemHelper}
      </UserGrid>
    </>
  )
}

export default DetailTweetPage
