import styles from './ProfilePage.module.scss'
// --- hook
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector, useDispatch } from 'react-redux'
// --- component
import { UserGrid } from '../Layout/GridSystemWrapper'
import TweetItem from '../components/TweetItem'
import ReplyItem from '../components/ReplyItem'
import { Button, ReplyModal } from '../UI/index'
// --- api
import {
  userGetProfileApi,
  userGetTweetsApi,
  userGetReplysApi,
  userGetLikesApi,
  userGetFollowingsApi,
} from '../api/userApi'
import { unfollowApi, followApi } from '../api/followshipsApi'
// --- store
// import { userActions } from '../store/user-slice'
import { userActions } from '../store/user-slice'
import { profileActions } from '../store/profile-slice'
// --- icons
import { prevIcon, defaultFig, cover } from '../components/assets/icons/index'
import { ReactComponent as LoadingIcon } from '../components/assets/icons/loading.svg'

const ProfilePage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // --- localStorage
  const authToken = localStorage.getItem('authToken')
  const userId = Number(localStorage.getItem('userId'))
  const profileId = Number(localStorage.getItem('profile_id'))
  // --- useState
  const [replyModal, setReplyModal] = useState(false)
  const [profilePage, setProfilePage] = useState('tweet')
  const [isUserFollowed, setIsUserFollowed] = useState(false)
  const [tweetPage, setTweetPage] = useState(1) // lazy loading
  const [replyPage, setReplyPage] = useState(1) // lazy loading
  const [likePage, setLikePage] = useState(1) // lazy loading
  const [hasMore, setHasMore] = useState(true) // lazy loading
  const [introHeight, setIntroHeight] = useState(0)
  // --- useRef
  const ref = useRef(null)
  // --- useSelector
  const isFollowUpdate = useSelector((state) => state.user.isFollowUpdate)
  const isTweetUpdate = useSelector((state) => state.user.isTweetUpdate)
  
  const profileInfo = useSelector((state) => state.profile.profileInfo)
  const profileTweetsData = useSelector(
    (state) => state.profile.profileTweetsData
  )
  const profileReplysData = useSelector(
    (state) => state.profile.profileReplysData
  )
  const profileLikesData = useSelector(
    (state) => state.profile.profileLikesData
  )
  const isReplyModalOpen = useSelector((state) => state.modal.isReplyModalOpen)
  // --- lazy loading related
  //userGetTweets
  const userGetTweets = async (profileId, tweetPage) => {
    try {
      const res = await userGetTweetsApi(profileId, tweetPage)
      await dispatch(profileActions.setProfileTweetsData(res.data))
    } catch (error) {
      console.error(error)
      return error
    }
  }
  // lazy loading for tweet list
  const changeTweetPage = () => {
    const tweetGetAll = async () => {
      try {
        const res = await userGetTweetsApi(profileId, tweetPage)
        setHasMore(res.data.length)
        await dispatch(
          profileActions.setProfileTweetsData(
            profileTweetsData.concat(res.data)
          )
        )
        setTweetPage((page) => page + 1)
      } catch (error) {
        console.error(error)
      }
    }
    tweetGetAll()
  }
  //userGetReplys
  const userGetReplys = async (profileId, replyPage) => {
    try {
      const res = await userGetReplysApi(profileId, replyPage)
      await dispatch(profileActions.setProfileReplysData(res.data))
    } catch (error) {
      console.error(error)
      return error
    }
  }
  // lazy loading for reply list
  const changeReplyPage = () => {
    const replyGetAll = async () => {
      try {
        const res = await userGetReplysApi(profileId, replyPage)
        setHasMore(res.data.length)
        await dispatch(
          profileActions.setProfileReplysData(
            profileReplysData.concat(res.data)
          )
        )
        setReplyPage((replyPage) => replyPage + 1)
      } catch (error) {
        console.error(error)
      }
    }
    replyGetAll()
  }

  //userGetLikes
  const userGetLikes = async (profileId, likePage) => {
    try {
      const res = await userGetLikesApi(profileId, likePage)
      const temp = res.data
      const tweetDatas = temp.map((data) => data.Tweet)
      await dispatch(profileActions.setProfileLikesData(tweetDatas))
    } catch (error) {
      console.error(error)
      return error
    }
  }
  // lazy loading for like list
  const changeLikePage = () => {
    const likeGetAll = async () => {
      try {
        const res = await userGetLikesApi(profileId, likePage)
        const temp = res.data
        const tweetDatas = temp.map((data) => data.Tweet)
        await dispatch(
          profileActions.setProfileLikesData(
            profileLikesData.concat(tweetDatas)
          )
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
  }, [])

  useEffect(() => {
    setIntroHeight(ref.current.clientHeight)
  }, [])

  // userGetProfile
  useEffect(() => {
    const userGetProfile = async () => {
      try {
        const res = await userGetProfileApi(profileId)
        await dispatch(profileActions.setProfileInfo(res.data))
        const { name } = await res.data
        const res_2 = await userGetFollowingsApi(userId)
        const userFollowingsList = res_2.data
        // 到其他使用者頁面時，判斷用戶是否 follow 該使用者
        const temp = userFollowingsList.find((data) => data.name === name)
        if (temp) {
          setIsUserFollowed(true)
        } else {
          setIsUserFollowed(false)
        }
      } catch (error) {
        console.error(error)
        return error
      }
    }
    if (authToken !== null) {
      userGetProfile(profileId)
    }
  }, [authToken, dispatch, profileId, userId, isFollowUpdate])

  useEffect(() => {
    userGetTweets(profileId, 1)
    setTweetPage(2)
  }, [profileId, isTweetUpdate])

  useEffect(() => {
    userGetReplys(profileId, 1)
    setReplyPage(2)
  }, [profileId])

  useEffect(() => {
    userGetLikes(profileId, 1)
    setLikePage(2)
  }, [profileId])

  // --- helper constant
  const profileTweetList = profileTweetsData.map((data) => (
    <TweetItem
      data={data}
      key={data.id}
      setReplyModal={setReplyModal}
      onClick={(replyModal) => setReplyModal(replyModal)}
    />
  ))

  const profileReplyList = profileReplysData.map((data) => (
    <ReplyItem data={data} key={data.id} />
  ))

  const profileLikeList = profileLikesData.map((data) => (
    <TweetItem
      data={data}
      key={data.id}
      setReplyModal={setReplyModal}
      onClick={(replyModal) => setReplyModal(replyModal)}
    />
  ))

  const vh = Math.round(window.innerHeight)

  return (
    <>
      <ReplyModal trigger={isReplyModalOpen} />
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
            <div className={styles.name}>{profileInfo.name}</div>
            <div className={styles.tweet__num}>
              {profileInfo.tweetCounts} 推文
            </div>
          </div>
        </div>
        <div className={styles.user__profile__collection}>
          <div className={styles.cover}>
            <img
              src={profileInfo.cover ? profileInfo.cover : cover}
              alt='cover'
            />
          </div>
          <img
            className={styles.avatar}
            src={profileInfo.avatar ? profileInfo.avatar : defaultFig}
            alt='avatar'
          />
          <div className={styles.user__info}>
            <div className={styles.name}>{profileInfo.name}</div>
            <div className={styles.account}>@{profileInfo.account}</div>
            <div className={styles.intro} ref={ref}>
              {profileInfo.introduction === 'null'
                ? `Hello! My name is ${profileInfo.name}`
                : profileInfo.introduction}
            </div>
            <div className={styles.follow__info}>
              <Link to='/users/following/other' className={styles.link}>
                <div className={styles.num} style={{ color: '#171725' }}>
                  {profileInfo.followingCounts} 個
                </div>
                <p>跟隨中</p>
              </Link>
              <div className={styles.container}>
                <Link to='/users/follower/other' className={styles.link}>
                  <div className={styles.num} style={{ color: '#171725' }}>
                    {profileInfo.followerCounts} 位
                  </div>
                  <p>跟隨者</p>
                </Link>
              </div>
            </div>
          </div>
          <>
            <div className={styles.chat__icon__container}>
              <div className={styles.chat__icon}></div>
            </div>
            <div className={styles.notification__icon__container}>
              <div className={styles.notification__icon}></div>
            </div>
            {isUserFollowed ? (
              <Button
                className={`button button__md active ${styles.button}`}
                title='正在追隨'
                style={{ width: '98px' }}
                onClick={async () => {
                  await unfollowApi(profileId)
                  await dispatch(userActions.setIsFollowUpdate())
                }}
              />
            ) : (
              <Button
                className={`button button__md ${styles.button}`}
                title='跟隨'
                style={{ width: '98px' }}
                onClick={async () => {
                  await followApi(profileId)
                  await dispatch(userActions.setIsFollowUpdate())
                }}
              />
            )}
          </>
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
        {profilePage === 'tweet' && profileTweetsData.length !== 0 ? (
          <InfiniteScroll
            dataLength={profileTweetsData.length}
            next={changeTweetPage}
            hasMore={hasMore !== 0}
            loader={<LoadingIcon className={styles.loading__icon} />}
            endMessage={null}
            scrollableTarget='tweet__list'
            height={vh - 480 - introHeight}
          >
            {profileTweetList}
          </InfiniteScroll>
        ) : undefined}

        {profilePage === 'reply' && profileReplysData.length !== 0 ? (
          <InfiniteScroll
            dataLength={profileReplysData.length}
            next={changeReplyPage}
            hasMore={hasMore !== 0}
            loader={<LoadingIcon className={styles.loading__icon} />}
            endMessage={null}
            scrollableTarget='tweet__list'
            height={vh - 480 - introHeight}
          >
            {profileReplyList}
          </InfiniteScroll>
        ) : undefined}

        {profilePage === 'like' && profileLikesData.length !== 0 ? (
          <InfiniteScroll
            dataLength={profileLikesData.length}
            next={changeLikePage}
            hasMore={hasMore !== 0}
            loader={<LoadingIcon className={styles.loading__icon} />}
            endMessage={null}
            scrollableTarget='tweet__list'
            height={vh - 480 - introHeight}
          >
            {profileLikeList}
          </InfiniteScroll>
        ) : undefined}
      </UserGrid>
    </>
  )
}

export default ProfilePage
