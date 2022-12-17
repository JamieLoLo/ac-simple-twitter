import styles from './UserProfilePage.module.scss'
import { UserGrid } from '../Layout/GridSystemWrapper'
import prevLogo from '../components/assets/icons/prev.svg'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import cover from '../components/assets/icons/cover.svg'
import TweetItem from '../components/TweetItem'
import ReplyItem from '../components/ReplyItem'
import Button from '../UI/Button'
import EditProfileModal from '../UI/EditProfileModal'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ReactComponent as LoadingIcon } from '../components/assets/icons/loading.svg'

import {
  userGetProfileApi,
  userGetTweetsApi,
  userGetReplysApi,
  userGetLikesApi,
  userGetFollowingsApi,
} from '../api/userApi'
import ReplyModal from '../UI/ReplyModal'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../store/user-slice'
import { unfollowApi, followApi } from '../api/followshipsApi'

const UserProfilePage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // --- localStorage
  const authToken = localStorage.getItem('authToken')
  const userId = localStorage.getItem('userId')
  const profileId = localStorage.getItem('profile_id')
  // --- useState
  const [editModal, setEditModal] = useState(false)
  const [replyModal, setReplyModal] = useState(false)
  const [profilePage, setProfilePage] = useState('tweet')
  const [isUserFollowed, setIsUserFollowed] = useState(false)
  const [tweetPage, setTweetPage] = useState(1)
  const [replyPage, setReplyPage] = useState(1)
  const [likePage, setLikePage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  // --- useSelector
  const isFollowUpdate = useSelector((state) => state.user.isFollowUpdate)
  const isUserInfoUpdate = useSelector((state) => state.user.isUserInfoUpdate)
  const isTweetUpdate = useSelector((state) => state.user.isTweetUpdate)
  const userInfo = useSelector((state) => state.user.userInfo)
  const userTweetsData = useSelector((state) => state.user.userTweetsData)
  const userReplysData = useSelector((state) => state.user.userReplysData)
  const userLikesData = useSelector((state) => state.user.userLikesData)
  // --- useEffect

  useEffect(() => {
    if (authToken === null) {
      navigate('/users/login')
    }
  }, [])

  // userGetProfile
  useEffect(() => {
    const userGetProfile = async () => {
      try {
        const res = await userGetProfileApi(profileId)
        await dispatch(userActions.setUserInfo(res.data))
        const { name } = res.data
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
    if ((profileId !== null) & (authToken !== null)) {
      userGetProfile()
    }
  }, [profileId, isUserInfoUpdate, isFollowUpdate])

  //userGetTweets

  const userGetTweets = async (profileId, tweetPage) => {
    try {
      const res = await userGetTweetsApi(profileId, tweetPage)
      await dispatch(userActions.setUserTweetsData(res.data))
    } catch (error) {
      console.error(error)
      return error
    }
  }

  useEffect(() => {
    userGetTweets(profileId, 1)
    setTweetPage(2)
  }, [profileId])

  // lazy loading for tweet list
  const changeTweetPage = () => {
    const tweetGetAll = async () => {
      try {
        const res = await userGetTweetsApi(profileId, tweetPage)
        if (res.status !== 200) {
          localStorage.removeItem('authToken')
          navigate('/users/login')
        }
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

  const userGetReplys = async (profileId, replyPage) => {
    try {
      const res = await userGetReplysApi(profileId, replyPage)
      await dispatch(userActions.setUserReplysData(res.data))
    } catch (error) {
      console.error(error)
      return error
    }
  }

  useEffect(() => {
    userGetReplys(profileId, 1)
    setReplyPage(2)
  }, [profileId])

  // lazy loading for reply list
  const changeReplyPage = () => {
    const replyGetAll = async () => {
      try {
        const res = await userGetReplysApi(profileId, replyPage)
        if (res.status !== 200) {
          localStorage.removeItem('authToken')
          navigate('/users/login')
        }
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

  const userGetLikes = async (profileId, likePage) => {
    try {
      const res = await userGetLikesApi(profileId, likePage)
      const temp = res.data
      const tweetDatas = temp.map((data) => data.Tweet)
      await dispatch(userActions.setUserLikesData(tweetDatas))
    } catch (error) {
      console.error(error)
      return error
    }
  }

  useEffect(() => {
    userGetLikes(profileId, 1)
    setLikePage(2)
  }, [profileId])

  // lazy loading for like list
  const changeLikePage = () => {
    const likeGetAll = async () => {
      try {
        const res = await userGetLikesApi(profileId, likePage)
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

  const userTweetList = userTweetsData.map((data) => (
    <TweetItem
      data={data}
      key={data.id}
      setReplyModal={setReplyModal}
      onClick={(replyModal) => setReplyModal(replyModal)}
    />
  ))

  const userLikeList = userLikesData.map((data) => (
    <TweetItem
      data={data}
      key={data.id}
      setReplyModal={setReplyModal}
      onClick={(replyModal) => setReplyModal(replyModal)}
    />
  ))

  const userReplyList = userReplysData.map((data) => (
    <ReplyItem data={data} key={data.id} />
  ))

  return (
    <>
      <EditProfileModal trigger={editModal} setEditModal={setEditModal} />
      <ReplyModal trigger={replyModal} setReplyModal={setReplyModal} />
      <UserGrid pathname={pathname} id={'tweet__list'}>
        <div className={styles.title}>
          <img
            src={prevLogo}
            alt='prev'
            onClick={() => {
              navigate('/users/main')
            }}
          />
          <div className={styles.container}>
            <div className={styles.name}>{userInfo.name}</div>
            <div className={styles.tweet__num}>
              {userTweetsData.length} 推文
            </div>
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
            <div className={styles.intro}>{userInfo.introduction}</div>
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
          {userId === profileId && (
            <Button
              className={`button button__md ${styles.button}`}
              title='編輯個人資料'
              style={{ width: '140px' }}
              onClick={() => setEditModal(true)}
            />
          )}

          {userId !== profileId && (
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
          )}
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
            height={300}
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
            height={300}
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
            height={300}
          >
            {userLikeList}
          </InfiniteScroll>
        ) : undefined}
      </UserGrid>
    </>
  )
}

export default UserProfilePage
