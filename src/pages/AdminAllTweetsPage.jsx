import styles from './AdminAllTweetsPage.module.scss'
import AdminTweetItem from '../components/AdminTweetItem'
import { AdminGrid } from '../Layout/GridSystemWrapper'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { adminGetAllTweetsApi } from '../api/adminApi'
import { useSelector } from 'react-redux'

const AdminAllTweetsPage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const isUpdate = useSelector((state) => state.user.isUpdate)
  useEffect(() => {
    const adminGetAllTweets = async () => {
      try {
        const res = await adminGetAllTweetsApi()
        setData(res.data)
      } catch (error) {
        console.error(error)
        navigate('/admin/login')
        localStorage.removeItem('authToken')
      }
    }
    adminGetAllTweets()
  }, [isUpdate])

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
