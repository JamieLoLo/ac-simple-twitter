import { UserGrid } from '../Layout/GridSystemWrapper'
import styles from './MainPage.module.scss'
import TweetItem from '../components/TweetItem'
import Button from '../UI/Button'
import { useLocation } from 'react-router-dom'
import TweetModal from '../UI/TweetModal'
import ReplyModal from '../UI/ReplyModal'
import { useState } from 'react'

const MainPage = () => {
  const [tweetModal, setTweetModal] = useState(false)
  const [replyModal, setReplyModal] = useState(false)
  const pathname = useLocation().pathname

  return (
    <>
      <TweetModal trigger={tweetModal} setTweetModal={setTweetModal} />
      <ReplyModal trigger={replyModal} setReplyModal={setReplyModal} />
      <UserGrid pathname={pathname}>
        <div className={styles.title}>首頁</div>
        <div className={styles.tweet__input__area}>
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
            onClick={() => setTweetModal(true)}
          />
        </div>
        <div className={styles.tweetItemList}>
          <TweetItem
            setReplyModal={setReplyModal}
            onClick={(replyModal) => setReplyModal(replyModal)}
          />
          <TweetItem
            setReplyModal={setReplyModal}
            onClick={(replyModal) => setReplyModal(replyModal)}
          />
          <TweetItem
            setReplyModal={setReplyModal}
            onClick={(replyModal) => setReplyModal(replyModal)}
          />
          <TweetItem
            setReplyModal={setReplyModal}
            onClick={(replyModal) => setReplyModal(replyModal)}
          />
          <TweetItem
            setReplyModal={setReplyModal}
            onClick={(replyModal) => setReplyModal(replyModal)}
          />
          <TweetItem
            setReplyModal={setReplyModal}
            onClick={(replyModal) => setReplyModal(replyModal)}
          />
        </div>
      </UserGrid>
    </>
  )
}

export default MainPage
