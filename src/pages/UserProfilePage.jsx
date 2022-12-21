import styles from './UserProfilePage.module.scss'
// --- hook
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef, useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector, useDispatch } from 'react-redux'
// --- component
import { UserGrid } from '../Layout/GridSystemWrapper'
import TweetItem from '../components/TweetItem'
import ReplyItem from '../components/ReplyItem'
import { Button, EditProfileModal, ReplyModal } from '../UI/index'
// --- api
import {
  userGetProfileApi,
  userGetTweetsApi,
  userGetReplysApi,
  userGetLikesApi,
} from '../api/userApi'
// --- store
import { userActions } from '../store/user-slice'
import { modalActions } from '../store/modal-slice'
// --- icons
import { prevIcon, defaultFig, cover } from '../components/assets/icons/index'
import { ReactComponent as LoadingIcon } from '../components/assets/icons/loading.svg'

const UserProfilePage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // --- localStorage
  const authToken = localStorage.getItem('authToken')
  const userId = Number(localStorage.getItem('userId'))
  // --- useState
  const [profilePage, setProfilePage] = useState('tweet')
  const [tweetPage, setTweetPage] = useState(1) // lazy loading
  const [replyPage, setReplyPage] = useState(1) // lazy loading
  const [likePage, setLikePage] = useState(1) // lazy loading
  const [hasMore, setHasMore] = useState(true) // lazy loading
  const [introHeight, setIntroHeight] = useState(0)
  // --- useRef
  const ref = useRef(null)
  // --- useSelector
  const isFollowUpdate = useSelector((state) => state.user.isFollowUpdate)
  const isUserInfoUpdate = useSelector((state) => state.user.isUserInfoUpdate)
  const isTweetUpdate = useSelector((state) => state.user.isTweetUpdate)
  const userInfo = useSelector((state) => state.user.userInfo)
  const userTweetsData = useSelector((state) => state.user.userTweetsData)
  const userReplysData = useSelector((state) => state.user.userReplysData)
  const userLikesData = useSelector((state) => state.user.userLikesData)
  const isReplyModalOpen = useSelector((state) => state.modal.isReplyModalOpen)
  const isEditProfileModalOpen = useSelector(
    (state) => state.modal.isEditProfileModalOpen
  )
  // --- lazy loading related
  //userGetTweets
  const userGetTweets = useCallback(
    async (userId, tweetPage) => {
      try {
        const res = await userGetTweetsApi(userId, tweetPage)
        await dispatch(userActions.setUserTweetsData(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    },
    [dispatch]
  )
  // lazy loading for tweet list
  const changeTweetPage = () => {
    const tweetGetAll = async () => {
      try {
        const res = await userGetTweetsApi(userId, tweetPage)
        setHasMore(res.data.length)
        await dispatch(
          userActions.setUserTweetsData(userTweetsData.concat(res.data))
        )
        setTweetPage((page) => page + 1)
      } catch (error) {
        console.error(error)
      }
    }
    tweetGetAll()
  }
  //userGetReplys
  const userGetReplys = useCallback(
    async (userId, replyPage) => {
      try {
        const res = await userGetReplysApi(userId, replyPage)
        await dispatch(userActions.setUserReplysData(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    },
    [dispatch]
  )
  // lazy loading for reply list
  const changeReplyPage = () => {
    const replyGetAll = async () => {
      try {
        const res = await userGetReplysApi(userId, replyPage)
        setHasMore(res.data.length)
        await dispatch(
          userActions.setUserReplysData(userReplysData.concat(res.data))
        )
        setReplyPage((replyPage) => replyPage + 1)
      } catch (error) {
        console.error(error)
      }
    }
    replyGetAll()
  }
  //userGetLikes
  const userGetLikes = useCallback(
    async (userId, likePage) => {
      try {
        const res = await userGetLikesApi(userId, likePage)
        const temp = res.data
        const tweetDatas = temp.map((data) => data.Tweet)
        await dispatch(userActions.setUserLikesData(tweetDatas))
      } catch (error) {
        console.error(error)
        return error
      }
    },
    [dispatch]
  )
  // lazy loading for like list
  const changeLikePage = () => {
    const likeGetAll = async () => {
      try {
        const res = await userGetLikesApi(userId, likePage)
        const temp = res.data
        const tweetDatas = temp.map((data) => data.Tweet)
        await dispatch(
          userActions.setUserLikesData(userLikesData.concat(tweetDatas))
        )
        setHasMore(tweetDatas.length)
        setLikePage((likePage) => likePage + 1)
      } catch (error) {
        console.error(error)
      }
    }
    likeGetAll()
  }
  // --- useEffect

  useEffect(() => {
    if (authToken === null) {
      navigate('/users/login')
    }
  }, [authToken, navigate])

  useEffect(() => {
    setIntroHeight(ref.current.clientHeight)
  }, [])

  // userGetProfile
  useEffect(() => {
    const userGetProfile = async () => {
      try {
        const res = await userGetProfileApi(userId)
        await dispatch(userActions.setUserInfo(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    if (authToken !== null) {
      userGetProfile()
    }
  }, [isUserInfoUpdate, isFollowUpdate, authToken, userId, dispatch])

  useEffect(() => {
    userGetTweets(userId, 1)
    setTweetPage(2)
  }, [userId, isTweetUpdate, isUserInfoUpdate])

  useEffect(() => {
    userGetReplys(userId, 1)
    setReplyPage(2)
  }, [userId, isTweetUpdate, isUserInfoUpdate])

  useEffect(() => {
    userGetLikes(userId, 1)
    setLikePage(2)
  }, [userId, isTweetUpdate, isUserInfoUpdate])

  // --- helper constant
  const userTweetList = userTweetsData.map((data) => (
    <TweetItem data={data} key={data.id} />
  ))

  const userReplyList = userReplysData.map((data) => (
    <ReplyItem data={data} key={data.id} />
  ))

  const userLikeList = userLikesData.map((data) => (
    <TweetItem data={data} key={data.id} />
  ))

  const vh = Math.round(window.innerHeight)

  return (
    <>
      <EditProfileModal trigger={isEditProfileModalOpen} data={userInfo} />
      <ReplyModal trigger={isReplyModalOpen} data={userInfo} />
      <UserGrid pathname={pathname} id={'tweet__list'}>
        <div className={styles.title}>
          <img
            src={prevIcon}
            alt='prev'
            onClick={() => {
              navigate('/users/main')
            }}
          />
          <div className={styles.container}>
            <div className={styles.name}>{userInfo.name}</div>
            <div className={styles.tweet__num}>{userInfo.tweetCounts} 推文</div>
          </div>
        </div>
        <div className={styles.user__profile__collection}>
          <div className={styles.cover}>
            <img src={userInfo.cover ? userInfo.cover : cover} alt='cover' />
          </div>
          <img
            className={styles.avatar}
            src={userInfo.avatar ? userInfo.avatar : defaultFig}
            alt='avatar'
          />
          <div className={styles.user__info}>
            <div className={styles.name}>{userInfo.name}</div>
            <div className={styles.account}>@{userInfo.account}</div>
            <div className={styles.intro} ref={ref}>
              {userInfo.introduction}
            </div>
            <div className={styles.follow__info}>
              <Link to='/users/following' className={styles.link}>
                <div className={styles.num} style={{ color: '#171725' }}>
                  {userInfo.followingCounts} 個
                </div>
                <p>跟隨中</p>
              </Link>
              <div className={styles.container}>
                <Link to='/users/follower' className={styles.link}>
                  <div className={styles.num} style={{ color: '#171725' }}>
                    {userInfo.followerCounts} 位
                  </div>
                  <p>跟隨者</p>
                </Link>
              </div>
            </div>
          </div>
          <Button
            className={`button button__md ${styles.button}`}
            title='編輯個人資料'
            style={{ width: '140px' }}
            onClick={() =>
              dispatch(modalActions.setIsEditProfileModalOpen(true))
            }
          />
        </div>
        <ul className={styles.bookmark}>
          <li
            className={profilePage === 'tweet' ? styles.active : undefined}
            onClick={() => {
              setProfilePage('tweet')
            }}
          >
            推文
          </li>
          <li
            className={profilePage === 'reply' ? styles.active : undefined}
            onClick={() => {
              setProfilePage('reply')
            }}
          >
            回覆
          </li>
          <li
            className={profilePage === 'like' ? styles.active : undefined}
            onClick={() => {
              setProfilePage('like')
            }}
          >
            喜歡的內容
          </li>
        </ul>
        {profilePage === 'tweet' && userTweetsData.length !== 0 ? (
          <InfiniteScroll
            dataLength={userTweetsData.length}
            next={changeTweetPage}
            hasMore={hasMore !== 0}
            loader={<LoadingIcon className={styles.loading__icon} />}
            endMessage={null}
            scrollableTarget='tweet__list'
            height={vh - 480 - introHeight}
          >
            {userTweetList}
          </InfiniteScroll>
        ) : undefined}

        {profilePage === 'reply' && userReplysData.length !== 0 ? (
          <InfiniteScroll
            dataLength={userReplysData.length}
            next={changeReplyPage}
            hasMore={hasMore !== 0}
            loader={<LoadingIcon className={styles.loading__icon} />}
            endMessage={null}
            scrollableTarget='tweet__list'
            height={vh - 480 - introHeight}
          >
            {userReplyList}
          </InfiniteScroll>
        ) : undefined}

        {profilePage === 'like' && userLikesData.length !== 0 ? (
          <InfiniteScroll
            dataLength={userLikesData.length}
            next={changeLikePage}
            hasMore={hasMore !== 0}
            loader={<LoadingIcon className={styles.loading__icon} />}
            endMessage={null}
            scrollableTarget='tweet__list'
            height={vh - 480 - introHeight}
          >
            {userLikeList}
          </InfiniteScroll>
        ) : undefined}
      </UserGrid>
    </>
  )
}

export default UserProfilePage
