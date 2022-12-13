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
import { useSelector } from 'react-redux'
import {
  userGetProfileApi,
  userGetTweetsApi,
  userGetReplysApi,
  userGetLikesApi,
} from '../api/userApi'
import ReplyModal from '../UI/ReplyModal'

const UserProfilePage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user.userInfo)
  const [editModal, setEditModal] = useState(false)
  const [replyModal, setReplyModal] = useState(false)
  const [userProfileData, setUserProfileData] = useState({})
  const [userTweetsData, setUserTweetsData] = useState([])
  const [userReplysData, setUserReplysData] = useState([])
  const [userLikesData, setUserLikesData] = useState([])
  const [profilePage, setProfilePage] = useState('reply')

  // userGetProfile
  useEffect(() => {
    const userGetProfile = async (data) => {
      try {
        const res = await userGetProfileApi(data)
        if (res.status !== 200) {
          navigate('/users/login')
        }
        await setUserProfileData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetProfile(userInfo.id)
  }, [])

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
    userGetTweets(userInfo.id)
  }, [])


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
    userGetReplys(userInfo.id)
  }, [])

  //userGetLikes
  useEffect(() => {
    const userGetLikes = async (data) => {
      try {
        const res = await userGetLikesApi(data)
        await setUserLikesData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetLikes(userInfo.id)
  }, [])

  const userTweetList = userTweetsData.map((data) => (

    <TweetItem
      data={data}
      key={data.id}
      setReplyModal={setReplyModal}
      onClick={(replyModal) => setReplyModal(replyModal)}
    />
  ))

  // 目前 userLikeList 為空，續待確認
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
                  {userProfileData.followingsCount}個
                </div>
                <p>跟隨中</p>
              </Link>
              <div className={styles.container}>
                <Link to='/users/follower' className={styles.link}>
                  <div className={styles.num} style={{ color: '#171725' }}>
                    {userProfileData.followersCount}位
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
            onClick={() => setEditModal(true)}
          />
        </div>
        <ul className={styles.bookmark}>
          <li
            className={profilePage === 'tweet' && styles.active}
            onClick={() => {
              setProfilePage('tweet')
            }}
          >
            推文
          </li>
          <li
            className={profilePage === 'reply' && styles.active}
            onClick={() => {
              setProfilePage('reply')
            }}
          >
            回覆
          </li>
          <li
            className={profilePage === 'like' && styles.active}
            onClick={() => {
              setProfilePage('like')
            }}
          >
            喜歡的內容
          </li>
        </ul>
        {profilePage === 'tweet' && userTweetList}
        {profilePage === 'reply' && userReplyList}
        {profilePage === 'like' && userLikeList}
      </UserGrid>
    </>
  )
}

export default UserProfilePage
