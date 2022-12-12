import styles from './AdminAllTweetsPage.module.scss'
import AdminTweetItem from '../components/AdminTweetItem'
import { AdminGrid } from '../Layout/GridSystemWrapper'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { adminGetAllTweetsApi } from '../api/adminApi'

const AdminAllTweetsPage = () => {
  const pathname = useLocation().pathname
  const [data, setData] = useState([])
  useEffect(() => {
    const adminGetAllTweets = async () => {
      try {
        const res = await adminGetAllTweetsApi()
        setData(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    adminGetAllTweets()
  }, [])

  const adminTweetItemHelper = data.map((data) => (
    <AdminTweetItem data={data} key={data.id} />
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
