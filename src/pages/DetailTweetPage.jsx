import styles from './DetailTweetPage.module.scss'
import prevIcon from '../components/assets/icons/prev.svg'
import { UserGrid } from '../Layout/GridSystemWrapper'
import DetailTweetItem from '../components/DetailTweetItem'

import ReplyItem from '../components/ReplyItem'
import ReplyModal from '../UI/ReplyModal'

const DetailTweetPage = () => {
  return (
    <>
      {/* <ReplyModal /> */}
      <UserGrid>
        <div className={styles.title}>
          <img src={prevIcon} alt='prev' />
          推文
        </div>
        <DetailTweetItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
      </UserGrid>
    </>
  )
}

export default DetailTweetPage
