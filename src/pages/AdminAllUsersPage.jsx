import styles from './AdminAllUsersPage.module.scss'
import { AdminGrid } from '../Layout/GridSystemWrapper'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminUserItem from '../components/AdminUserItem'
import { useState, useEffect } from 'react'
import { adminGetAllUsersApi } from '../api/adminApi'

const AdminAllUsersPage = () => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('authToken')

  if (authToken === null) {
    navigate('/users/login')
  }

  const adminUserItemHelper = data.map((data) => (
    <AdminUserItem data={data} key={data.id} />
  ))

  // admin 獲得所有 user
  useEffect(() => {
    const adminGetAllTweets = async () => {
      try {
        const res = await adminGetAllUsersApi()
        setData(res.data)
      } catch (error) {
        console.error(error)
        navigate('/admin/login')
        localStorage.removeItem('authToken')
      }
    }
    adminGetAllTweets()
  }, [navigate])

  return (
    <AdminGrid pathname={pathname}>
      <div className={styles.title}>使用者列表</div>
      <div className={styles.user__card__list}>{adminUserItemHelper}</div>
    </AdminGrid>
  )
}

export default AdminAllUsersPage
