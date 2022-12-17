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
import defaultFig from '../components/assets/icons/defaultFig.svg'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ReactComponent as LoadingIcon } from '../components/assets/icons/loading.svg'

const MainPage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // --- localStorage
  const userId = localStorage.getItem('userId')
  const authToken = localStorage.getItem('authToken')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [submitReRender, setSubmitReRender] = useState(false)
  // --- useState
  const [tweetModal, setTweetModal] = useState(false)
  const [replyModal, setReplyModal] = useState(false)
  const [allTweetsData, setAllTweetsData] = useState([])
  // --- useSelector
  const userInfo = useSelector((state) => state.user.userInfo)
  const isUserInfoUpdate = useSelector((state) => state.user.isUserInfoUpdate)
  const isTweetUpdate = useSelector((state) => state.user.isTweetUpdate)
  // --- useEffect

  // 清除登入資料，沒 authToken (沒經過正確登入過程) 就回去登入頁面
  useEffect(() => {
    dispatch(authInputActions.refreshAuthInput())
    if (authToken === null) {
      navigate('/users/login')
    }
  }, [])

  // 一進入頁面就 Get 使用者資料，以 isUserInfoUpdate 作為更新依據
  useEffect(() => {
    const userGetProfile = async () => {
      try {
        const res = await userGetProfileApi(userId)
        dispatch(userActions.setUserInfo(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    if (authToken !== null) {
      userGetProfile()
    }
  }, [isUserInfoUpdate])

  const tweetGetAll = async () => {
    try {
      const res = await tweetGetAllApi(1)
      if (res.status !== 200) {
        localStorage.removeItem('authToken')
        navigate('/users/login')
      }
      await setAllTweetsData(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  // 一進入頁面就 Get 所有推文
  useEffect(() => {
    tweetGetAll(1)
    setPage(2)
    setSubmitReRender(false)
  }, [submitReRender])

  const changePage = () => {
    const tweetGetAll = async () => {
      try {
        const res = await tweetGetAllApi(page)
        if (res.status !== 200) {
          localStorage.removeItem('authToken')
          navigate('/users/login')
        }
        setHasMore(res.data.length)
        await setAllTweetsData(allTweetsData.concat(res.data))
        setPage((page) => page + 1)
      } catch (error) {
        console.error(error)
      }
    }
    tweetGetAll()
  }

  // --- helper constant
  const tweetsListHelper = allTweetsData.map((data) => (
    <TweetItem
      data={data}
      key={data.id}
      setReplyModal={setReplyModal}
      onClick={(replyModal) => {
        setReplyModal(replyModal)
        localStorage.setItem('tweet_id', data.id)
      }}
    />
  ))

  return (
    <div>
      <ReplyModal
        trigger={replyModal}
        setReplyModal={setReplyModal}
        tweetUserAvatar={tweetUserAvatar}
        tweetUserName={tweetUserName}
        tweetUserAccount={tweetUserAccount}
        description={description}
        createdAt={createdAt}
      />
      <TweetModal
        trigger={tweetModal}
        setTweetModal={setTweetModal}
        setSubmitReRender={setSubmitReRender}
      />
      <UserGrid pathname={pathname} id={'tweet__list'}>
        <div className={styles.title}>首頁</div>
        <div className={styles.tweet__input__area}>
          <div className={styles.container}>
            <img
              className={styles.avatar}
              src={userInfo.avatar ? userInfo.avatar : defaultFig}
              alt='user'
            />
            <p>有什麼新鮮事嗎?</p>
          </div>
          <Button
            className={`button button__md active`}
            title='推文'
            style={{ width: '66px' }}
            onClick={() => setTweetModal(true)}
          />
        </div>
        <InfiniteScroll
          dataLength={allTweetsData.length}
          next={changePage}
          hasMore={hasMore !== 0}
          loader={<LoadingIcon className={styles.loading__icon} />}
          endMessage={null}
          scrollableTarget='tweet__list'
          height={700}
        >
          {tweetsListHelper}
        </InfiniteScroll>
      </UserGrid>
    </div>
  )
}

export default MainPage
