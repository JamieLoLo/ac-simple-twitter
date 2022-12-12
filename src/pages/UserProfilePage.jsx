import styles from './UserProfilePage.module.scss'
import { UserGrid } from '../Layout/GridSystemWrapper'
import prevLogo from '../components/assets/icons/prev.svg'
import cover from '../components/assets/icons/cover.svg'
import { ProfileTweetItem } from '../components/TweetItem'
import ReplyItem from '../components/ReplyItem'
import Button from '../UI/Button'
import EditProfileModal from '../UI/EditProfileModal'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userGetProfileApi, userGetTweetsApi } from '../api/userApi'

const UserProfilePage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user.userInfo)
  const [userProfileData, setUserProfileData] = useState({})
  const [userTweetsData, setUserTweetsData] = useState([])
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

  const userTweetListHelper = userTweetsData.map((data) => (
    <ProfileTweetItem data={data} key={data.id} />
  ))

  return (
    <>
      {/* <EditProfileModal/> */}
      <UserGrid pathname={pathname}>
        <div className={styles.title}>
          <img src={prevLogo} alt='prev' />
          <div className={styles.container}>
            <div className={styles.name}>{userProfileData.name}</div>
            <div className={styles.tweet__num}>
              {userTweetsData.length} 推文
            </div>
          </div>
        </div>
        <div className={styles.user__profile__collection}>
          <div className={styles.cover}>
            <img src={userProfileData.cover} alt='cover' />
          </div>
          <img
            className={styles.avatar}
            src={userProfileData.avatar}
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
          />
        </div>
        <ul className={styles.bookmark}>
          <li>推文</li>
          <li>回覆</li>
          <li>喜歡的內容</li>
        </ul>
        <div className={styles.tweetlist}>{userTweetListHelper}</div>
        {/* <div className={styles.replylist}>
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
      </div> */}
        {/* <div className={styles.like__tweet__list}>
          <TweetItem isFollowed={true} />
          <TweetItem isFollowed={true} />
          <TweetItem isFollowed={true} />
          <TweetItem isFollowed={true} />
          <TweetItem isFollowed={true} />
          <TweetItem isFollowed={true} />
        </div> */}
      </UserGrid>
    </>
  )
}

export default UserProfilePage
