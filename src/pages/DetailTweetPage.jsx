import styles from './DetailTweetPage.module.scss'
import prevIcon from '../components/assets/icons/prev.svg'
import { UserGrid } from '../Layout/GridSystemWrapper'
import DetailTweetItem from '../components/DetailTweetItem'
import { tweetGetOneApi } from '../api/tweetApi'
import ReplyItem from '../components/ReplyItem'
import ReplyModal from '../UI/ReplyModal'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DetailTweetPage = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const tweetGetOne = async () => {
      try {
        const res = await tweetGetOneApi(504)
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

  return (
    <>
      {/* <ReplyModal /> */}
      <UserGrid>
        <div className={styles.title}>
          <img src={prevIcon} alt='prev' />
          推文
        </div>
        <DetailTweetItem description={data.description} />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
      </UserGrid>
    </>
  )
}

export default DetailTweetPage
