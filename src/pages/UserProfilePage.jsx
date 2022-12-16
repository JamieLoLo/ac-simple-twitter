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
import { userGetFollowingsApi } from '../api/userApi'

import {
  userGetProfileApi,
  userGetTweetsApi,
  userGetReplysApi,
  userGetLikesApi,
} from '../api/userApi'
import ReplyModal from '../UI/ReplyModal'
import { useSelector } from 'react-redux'

const UserProfilePage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const [editModal, setEditModal] = useState(false)
  const [replyModal, setReplyModal] = useState(false)
  const [userProfileData, setUserProfileData] = useState({})
  const [userTweetsData, setUserTweetsData] = useState([])
  const [userReplysData, setUserReplysData] = useState([])
  const [userLikesData, setUserLikesData] = useState([])
  const [profilePage, setProfilePage] = useState('tweet')
  const userId = localStorage.getItem('userId')
  const profileId = localStorage.getItem('profile_id')
  const tweetUserAvatar = localStorage.getItem('tweet_user_avatar')
  const isUpdate = useSelector((state) => state.user.isUpdate)
  const [isUserFollowed, setIsUserFollowed] = useState(false)

  useEffect(() => {
    const userGetFollowings = async () => {
      try {
        const res = await userGetFollowingsApi(userId)
        const userFollowingsList = res.data
        const temp = userFollowingsList.find((data)=> data.name === userProfileData.name)
        if(temp) {
          setIsUserFollowed(true)
        } else {
          setIsUserFollowed(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (profileId !== userId) {
      userGetFollowings()
    }
  }, [profileId, userId, userProfileData.name])

  // userGetProfile
  useEffect(() => {
    const userGetProfile = async () => {
      try {
        const res = await userGetProfileApi(profileId)
        await setUserProfileData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetProfile()
  }, [profileId, tweetUserAvatar])

  //userGetTweets
  useEffect(() => {
    const userGetTweets = async (data) => {
      try {
        const res = await userGetTweetsApi(data)
        await setUserTweetsData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetTweets(profileId)
  }, [profileId, isUpdate])

  //userGetReplys
  useEffect(() => {
    const userGetReplys = async (data) => {
      try {
        const res = await userGetReplysApi(data)
        await setUserReplysData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetReplys(profileId)
  }, [profileId])

  //userGetLikes
  useEffect(() => {
    const userGetLikes = async (data) => {
      try {
        const res = await userGetLikesApi(data)
        const temp = res.data
        const tweetDatas = temp.map((data) => data.Tweet)
        await setUserLikesData(tweetDatas)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetLikes(profileId)
  }, [profileId])

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
      <EditProfileModal
        trigger={editModal}
        setEditModal={setEditModal}
        userProfileData={userProfileData}
      />
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
            <div className={styles.name}>{userProfileData.name}</div>
            <div className={styles.tweet__num}>
              {userTweetsData.length} 推文
            </div>
          </div>
        </div>
        <div className={styles.user__profile__collection}>
          <div className={styles.cover}>
            <img
              src={userProfileData.cover ? userProfileData.cover : cover}
              alt='cover'
            />
          </div>
          <img
            className={styles.avatar}
            src={userProfileData.avatar ? userProfileData.avatar : defaultFig}
            alt='avatar'
          />
          <div className={styles.user__info}>
            <div className={styles.name}>{userProfileData.name}</div>
            <div className={styles.account}>@{userProfileData.account}</div>
            <div className={styles.intro}>{userProfileData.introduction}</div>
            <div className={styles.follow__info}>
              <Link to='/users/following' className={styles.link}>
                <div className={styles.num} style={{ color: '#171725' }}>
                  {userProfileData.followingCounts} 個
                </div>
                <p>跟隨中</p>
              </Link>
              <div className={styles.container}>
                <Link to='/users/follower' className={styles.link}>
                  <div className={styles.num} style={{ color: '#171725' }}>
                    {userProfileData.followerCounts} 位
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
                />
              ) : (
                <Button
                  className={`button button__md ${styles.button}`}
                  title='跟隨'
                  style={{ width: '98px' }}
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
