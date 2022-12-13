import styles from './DetailTweetPage.module.scss'
import prevIcon from '../components/assets/icons/prev.svg'
import { UserGrid } from '../Layout/GridSystemWrapper'
import DetailTweetItem from '../components/DetailTweetItem'
import { tweetGetOneApi, replyGetOneApi } from '../api/tweetApi'
import ReplyItem from '../components/ReplyItem'
import ReplyModal from '../UI/ReplyModal'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DetailTweetPage = () => {
  const [data, setData] = useState([])
  const [replyData, setReplyData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tweetGetOne = async () => {
      try {
        const res = await tweetGetOneApi(4)
        setData(res.data)
        console.log(res.data)
      } catch (error) {
        console.error(error)
        navigate('/users/login')
        localStorage.removeItem('authToken')
      }
    }
    tweetGetOne()
  }, [])

  // useEffect(() => {
  //   const replyGetOne = async () => {
  //     try {
  //       const res = await replyGetOneApi(504)
  //       setReplyData(res.data)
  //       console.log(res.data)
  //     } catch (error) {
  //       console.error(error)
  //       navigate('/users/login')
  //       localStorage.removeItem('authToken')
  //     }
  //   }
  //   replyGetOne()
  // }, [])

  // const replyItemHelper = () => {
  //   replyData.map((data) => (
  //     <ReplyItem
  //       comment={data.comment}
  //       name={data.User.name}
  //       account={data.User.account}
  //     />
  //   ))
  // }
  // console.log(data)
  return (
    <>
      {/* <ReplyModal /> */}
      <UserGrid>
        <div className={styles.title}>
          <img src={prevIcon} alt='prev' />
          推文
        </div>
        <DetailTweetItem
        // account={data.User.account}
        // name={data.User.name}
        // avatar={data.User.avatar}
        // description={data.description}
        // createdAt={data.createdAt}
        // isLiked={data.isLiked}
        // likeCounts={data.likeCounts}
        // replyCounts={data.replyCounts}
        />
        <ReplyItem />
      </UserGrid>
    </>
  )
}

export default DetailTweetPage
