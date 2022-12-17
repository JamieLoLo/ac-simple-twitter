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
  useEffect(() => {
    const userGetTweets = async (data) => {
      try {
        const res = await userGetTweetsApi(data)
        await dispatch(userActions.setUserTweetsData(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    if (profileId !== null) {
      userGetTweets(profileId)
    }
  }, [isTweetUpdate, profileId, isUserInfoUpdate])

  //userGetReplys
  useEffect(() => {
    const userGetReplys = async (data) => {
      try {
        const res = await userGetReplysApi(data)
        await dispatch(userActions.setUserReplysData(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    if (profileId !== null) {
      userGetReplys(profileId)
    }
  }, [isTweetUpdate, profileId, isUserInfoUpdate])

  //userGetLikes
  useEffect(() => {
    const userGetLikes = async (data) => {
      try {
        const res = await userGetLikesApi(data)
        const temp = res.data
        const tweetDatas = temp.map((data) => data.Tweet)
        await dispatch(userActions.setUserLikesData(tweetDatas))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetLikes(profileId)
  }, [isTweetUpdate, profileId, isUserInfoUpdate])

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
      <UserGrid pathname={pathname}>
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
        {profilePage === 'tweet' ? userTweetList : undefined}
        {profilePage === 'reply' ? userReplyList : undefined}
        {profilePage === 'like' ? userLikeList : undefined}
      </UserGrid>
    </>
  )
}

export default UserProfilePage
