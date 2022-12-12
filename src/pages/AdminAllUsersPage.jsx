import styles from './AdminAllUsersPage.module.scss'
import { AdminGrid } from '../Layout/GridSystemWrapper'
import { useLocation } from 'react-router-dom'
import AdminUserItem from '../components/AdminUserItem'
import { useState, useEffect } from 'react'
import { adminGetAllUsersApi } from '../api/adminApi'

const AdminAllUsersPage = () => {
  const [data, setData] = useState([])
  const pathname = useLocation().pathname
  useEffect(() => {
    const adminGetAllTweets = async () => {
      try {
        const res = await adminGetAllUsersApi()
        setData(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    adminGetAllTweets()
  }, [])
  const adminUserItemHelper = data.map((data) => (
    <AdminUserItem data={data} key={data.id} />
  ))
  return (
    <AdminGrid pathname={pathname}>
      <div className={styles.title}>使用者列表</div>
      <div className={styles.user__card__list}>{adminUserItemHelper}</div>
    </AdminGrid>
  )
}

export default AdminAllUsersPage
