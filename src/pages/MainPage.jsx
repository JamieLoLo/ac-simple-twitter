import { UserGrid } from '../Layout/GridSystemWrapper'
import styles from './MainPage.module.scss'
import TweetItem from '../components/TweetItem'
import Button from '../UI/Button'
import {useLocation} from 'react-router-dom' 

const MainPage = () => {
  const pathname = useLocation().pathname
  return (
    <>
      {/* <TweetModal/> */}
      {/* <ReplyModal/> */}
      <UserGrid pathname={pathname}>
        <div className={styles.title}>首頁</div>
        <div className={styles.tweetInputArea}>
          <div className={styles.container}>
            <img
              className={styles.avatar}
              src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
              alt='user'
            />
            <p>有什麼新鮮事嗎?</p>
          </div>
          <Button
            className={`button button__md active`}
            title='推文'
            style={{ width: '66px' }}
          />
        </div>
        <div className={styles.tweetItemList}>
          <TweetItem />
          <TweetItem />
          <TweetItem />
          <TweetItem />
          <TweetItem />
          <TweetItem />
        </div>
      </UserGrid>
    </>
  )
}

export default MainPage
