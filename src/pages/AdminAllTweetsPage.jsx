import styles from './AdminAllTweetsPage.module.scss'
import AdminTweetItem from '../components/AdminTweetItem'
import { AdminGrid } from '../Layout/GridSystemWrapper'

const AdminAllTweetsPage = () => {
  return (
    <AdminGrid>
      <div className={styles.adminAllTweets}>
        <div className={styles.title}>推文清單</div>
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
        <AdminTweetItem />
      </div>
    </AdminGrid>
  )
}
export default AdminAllTweetsPage
