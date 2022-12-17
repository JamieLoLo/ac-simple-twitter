import styles from './MainPage.module.scss'
// --- hook
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
// --- component
import { UserGrid } from '../Layout/GridSystemWrapper'
import { Button, TweetModal, ReplyModal } from '../UI/index'
import TweetItem from '../components/TweetItem'
// --- api
import { tweetGetAllApi } from '../api/tweetApi'
import { userGetProfileApi } from '../api/userApi'
// --- store
import { authInputActions } from '../store/authInput-slice'
import { userActions } from '../store/user-slice'
// --- icons
import { defaultFig } from '../components/assets/icons/index'
import { ReactComponent as LoadingIcon } from '../components/assets/icons/loading.svg'

const MainPage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // --- localStorage
  const userId = localStorage.getItem('userId')
  const authToken = localStorage.getItem('authToken')
  // --- useState
  const [tweetModal, setTweetModal] = useState(false) // TweetModal 的開關控制
  const [replyModal, setReplyModal] = useState(false) // ReplyModal 的開關控制
  const [page, setPage] = useState(1) // lazy loading 相關
  const [hasMore, setHasMore] = useState(true) // lazy loading 相關
  const [submitReRender, setSubmitReRender] = useState(false) // lazy loading 相關
  // --- useSelector
  const isUserInfoUpdate = useSelector((state) => state.user.isUserInfoUpdate)
  const isTweetUpdate = useSelector((state) => state.user.isTweetUpdate)
  const userInfo = useSelector((state) => state.user.userInfo)
  const allTweetsData = useSelector((state) => state.user.allTweetsData)
  // --- lazyloading related
  const tweetGetAll = async () => {
    try {
      const res = await tweetGetAllApi(1)
      await dispatch(userActions.setAllTweetsData(res.data))
    } catch (error) {
      console.error(error)
    }
  }
  const changePage = async () => {
    try {
      const res = await tweetGetAllApi(page)
      setHasMore(res.data.length)
      await dispatch(
        userActions.setAllTweetsData(allTweetsData.concat(res.data))
      )
      setPage((page) => page + 1)
    } catch (error) {
      console.error(error)
    }
  }
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

  // 一進入頁面就 Get 所有推文
  useEffect(() => {
    tweetGetAll(1)
    setPage(2)
    setSubmitReRender(false)
  }, [submitReRender, isTweetUpdate])

  // --- helper constant
  const tweetsListHelper = allTweetsData.map((data) => (
    <TweetItem
      data={data}
      key={data.id}
      setReplyModal={setReplyModal}
      onClick={async (replyModal) => {
        await localStorage.setItem('tweet_id', data.id)
        setReplyModal(replyModal)
      }}
    />
  ))
  const vh = Math.round(window.innerHeight)
  return (
    <div>
      <ReplyModal trigger={replyModal} setReplyModal={setReplyModal} />
      <TweetModal
        trigger={tweetModal}
        setTweetModal={setTweetModal}
        setSubmitReRender={setSubmitReRender}
      />
      <UserGrid pathname={pathname} id={'tweet__list'}>
        <div className={styles.title}>首頁</div>
        <div className={styles.tweet__input__area}>
          <div className={styles.container} onClick={() => setTweetModal(true)}>
            <img
              className={styles.avatar}
              src={userInfo.avatar ? userInfo.avatar : defaultFig}
              alt='Avatar'
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
          height={vh - 210}
        >
          {tweetsListHelper}
        </InfiniteScroll>
      </UserGrid>
    </div>
  )
}

export default MainPage
