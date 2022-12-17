import styles from './AdminAllUsersPage.module.scss'
import { AdminUserPageGrid } from '../Layout/GridSystemWrapper'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminUserItem from '../components/AdminUserItem'
import { useState, useEffect } from 'react'
import { adminGetAllUsersApi } from '../api/adminApi'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ReactComponent as LoadingIcon } from '../components/assets/icons/loading.svg'

const AdminAllUsersPage = () => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const authToken = localStorage.getItem('authToken')

  useEffect(() => {
    if (authToken === null) {
      navigate('/users/login')
    }
  }, [])

  const adminUserItemHelper = data.map((data) => (
    <AdminUserItem data={data} key={data.id} />
  ))

  // admin 獲得所有 user

  const adminGetAllUsers = async () => {
    try {
      const res = await adminGetAllUsersApi(1)
      setData(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    adminGetAllUsers(1)
    setPage(2)
  }, [navigate])

  // lazy loading for user list
  const changePage = () => {
    const adminGetAllUsers = async () => {
      try {
        const res = await adminGetAllUsersApi(page)
        setHasMore(res.data.length)
        await setData(data.concat(res.data))
        setPage((page) => page + 1)
      } catch (error) {
        console.error(error)
      }
    }
    adminGetAllUsers()
  }

  return (
    <AdminUserPageGrid pathname={pathname} id={'user__list'}>
      <div className={styles.title}>使用者列表</div>
      <div className={styles.user__card__list}>
        {data.length !== 0 && (
          <InfiniteScroll
            className={styles.infinite__scroll}
            dataLength={data.length}
            next={changePage}
            hasMore={hasMore !== 0}
            endMessage={null}
            scrollableTarget='user__list'
            loader={<LoadingIcon className={styles.loading__icon} />}
            height={850}
          >
            {adminUserItemHelper}
          </InfiniteScroll>
        )}
      </div>
    </AdminUserPageGrid>
  )
}

export default AdminAllUsersPage
