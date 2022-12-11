import styles from './AdminAllTweetsPage.module.scss'
import AdminTweetItem from '../components/AdminTweetItem'
import { AdminGrid } from '../Layout/GridSystemWrapper'
import { useLocation } from 'react-router-dom'

const response = [
  {
    id: 2,
    description: 'Placeat ad assumenda fugit. Molestias sapiente quo',
    UserId: 2,
    createdAt: '2022-12-09T11:39:09.000Z',
    updatedAt: '2022-12-09T11:39:09.000Z',
    User: {
      id: 2,
      account: 'user1',
      name: 'User1',
      avatar: 'https://loremflickr.com/320/240/logo/?lock=1',
    },
  },
]

const AdminAllTweetsPage = () => {
  const pathname = useLocation().pathname
  const adminTweetItemHelper = response.map((data) => (
    <AdminTweetItem data={data} key={data.id}/>
  ))
  return (
    <AdminGrid pathname={pathname}>
      <div className={styles.adminAllTweets}>
        <div className={styles.title}>推文清單</div>
        {adminTweetItemHelper}
      </div>
    </AdminGrid>
  )
}
export default AdminAllTweetsPage
