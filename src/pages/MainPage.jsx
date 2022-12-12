import { UserGrid } from '../Layout/GridSystemWrapper'
import styles from './MainPage.module.scss'
import { MainTweetItem } from '../components/TweetItem'
import Button from '../UI/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { tweetGetAllApi } from '../api/tweetApi'
import { useSelector } from 'react-redux'

const MainPage = () => {
  const userInfo = useSelector((state) => state.user.userInfo)
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const [allTweetsData, setAllTweetsData] = useState([])

  useEffect(() => {
    const tweetGetAll = async () => {
      try {
        const res = await tweetGetAllApi()
        if (res.status !== 200) {
          navigate('/users/login')
        }
        await setAllTweetsData(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    tweetGetAll()
  }, [])

  const tweetsListHelper = allTweetsData.map((data) => (
    <MainTweetItem data={data} key={data.id} setReplyModal={setReplyModal}
            onClick={(replyModal) => setReplyModal(replyModal)}/>
  ))

  return (
    <>
      <TweetModal trigger={tweetModal} setTweetModal={setTweetModal} />
      <ReplyModal trigger={replyModal} setReplyModal={setReplyModal} />
      <UserGrid pathname={pathname}>
        <div className={styles.title}>首頁</div>
        <div className={styles.tweet__input__area}>
          <div className={styles.container}>
            <img className={styles.avatar} src={userInfo.avatar} alt='user' />
            <p>有什麼新鮮事嗎?</p>
          </div>
          <Button
            className={`button button__md active`}
            title='推文'
            style={{ width: '66px' }}
            onClick={() => setTweetModal(true)}
          />
        </div>
        <div>{tweetsListHelper}</div>
      </UserGrid>
    </>
  )
}

export default MainPage
