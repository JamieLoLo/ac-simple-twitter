import { UserGrid } from '../Layout/GridSystemWrapper'
import styles from './MainPage.module.scss'
import TweetItem from '../components/TweetItem'
import Button from '../UI/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import TweetModal from '../UI/TweetModal'
import ReplyModal from '../UI/ReplyModal'
import { useEffect, useState } from 'react'
import { tweetGetAllApi } from '../api/tweetApi'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'
import { userGetProfileApi } from '../api/userApi'
import { userActions } from '../store/user-slice'
import { tweetGetOneApi } from '../api/tweetApi'

const MainPage = () => {
  const [tweetModal, setTweetModal] = useState(false)
  const [replyModal, setReplyModal] = useState(false)
  const userInfo = useSelector((state) => state.user.userInfo)
  const isUpdate = useSelector((state) => state.user.isUpdate)
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const [allTweetsData, setAllTweetsData] = useState([])
  const dispatch = useDispatch()
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    dispatch(authInputActions.refreshAuthInput())
  }, [])

  useEffect(() => {
    const userGetProfile = async () => {
      try {
        const userId = localStorage.getItem('userId')
        const res = await userGetProfileApi(userId)
        await dispatch(userActions.initialSetUserInfo(res.data))
        console.log(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetProfile(userId)
  }, [dispatch, userId])

  useEffect(() => {
    const tweetGetAll = async () => {
      try {
        const res = await tweetGetAllApi()
        if (res.status !== 200) {
          localStorage.removeItem('authToken')
          navigate('/users/login')
        }
        await setAllTweetsData(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    tweetGetAll()
  }, [allTweetsData, navigate])

  const tweetsListHelper = allTweetsData.map((data) => (
    <TweetItem
      tweetData={data}
      key={data.id}
      setReplyModal={setReplyModal}
      onClick={(replyModal) => {
        setReplyModal(replyModal)
      }}
    />
  ))
  const tweetUserAvatar = localStorage.getItem('tweet_user_avatar')
  const tweetUserName = localStorage.getItem('tweet_user_name')
  const tweetUserAccount = localStorage.getItem('tweet_user_account')
  const description = localStorage.getItem('tweet_description')
  const createdAt = localStorage.getItem('tweet_createdAt')

  return (
    <>
      <ReplyModal
        trigger={replyModal}
        setReplyModal={setReplyModal}
        tweetUserAvatar={tweetUserAvatar}
        tweetUserName={tweetUserName}
        tweetUserAccount={tweetUserAccount}
        description={description}
        createdAt={createdAt}
      />
      <TweetModal trigger={tweetModal} setTweetModal={setTweetModal} />
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
