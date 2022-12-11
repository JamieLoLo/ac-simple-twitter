import styles from './UserProfilePage.module.scss'
import { UserGrid } from '../Layout/GridSystemWrapper'
import prevLogo from '../components/assets/icons/prev.svg'
import cover from '../components/assets/icons/cover.svg'
import TweetItem from '../components/TweetItem'
import ReplyItem from '../components/ReplyItem'
import Button from '../UI/Button'
import EditProfileModal from '../UI/EditProfileModal'
import { useLocation, Link } from 'react-router-dom'

const UserProfilePage = () => {
  const pathname = useLocation().pathname
  return (
    <>
      {/* <EditProfileModal/> */}
      <UserGrid pathname={pathname}>
        <div className={styles.title}>
          <img src={prevLogo} alt='prev' />
          <div className={styles.container}>
            <div className={styles.name}>John Doe</div>
            <div className={styles.tweetNum}>25 推文</div>
          </div>
        </div>
        <div className={styles.userProfileCollection}>
          <div className={styles.cover}>
            <img src={cover} alt='cover' />
          </div>
          <img
            className={styles.avatar}
            src='https://precisionhealth.iu.edu/images/BernicePescosolido.jpg'
            alt='avatar'
          />
          <div className={styles.userInfo}>
            <div className={styles.name}>John Doe</div>
            <div className={styles.account}>@heyjohn</div>
            <div className={styles.intro}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint.
            </div>
            <div className={styles.followInfo}>
              <Link to='/users/following' className={styles.link}>
                <div className={styles.num} style={{ color: '#171725' }}>
                  34個
                </div>
                <p>跟隨中</p>
              </Link>
              <div className={styles.container}>
                <Link to='/users/follower' className={styles.link}>
                  <div className={styles.num} style={{ color: '#171725' }}>
                    59位
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
        <ul className={styles.bookMark}>
          <li>推文</li>
          <li>回覆</li>
          <li>喜歡的內容</li>
        </ul>
        {/* <div className={styles.tweetlist}>
        <TweetItem />
        <TweetItem />
        <TweetItem />
        <TweetItem />
        <TweetItem />
        <TweetItem />
        <TweetItem />
        <TweetItem />
      </div> */}
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
        <div className={styles.likeTweetList}>
          <TweetItem isFollowed={true} />
          <TweetItem isFollowed={true} />
          <TweetItem isFollowed={true} />
          <TweetItem isFollowed={true} />
          <TweetItem isFollowed={true} />
          <TweetItem isFollowed={true} />
        </div>
      </UserGrid>
    </>
  )
}

export default UserProfilePage
