import styles from './AdminAllUsersPage.module.scss'
// --- hook
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
// --- component
import { AdminUserPageGrid } from '../Layout/GridSystemWrapper'
import AdminUserItem from '../components/AdminUserItem'
// --- api
import { adminGetAllUsersApi } from '../api/adminApi'
// --- store
// --- icons
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
  }, [authToken, navigate])

  const filterData = data.filter((user) => user.account !== 'root')
  const adminUserItemHelper = filterData.map((data) => (
    <AdminUserItem data={data} key={data.id} />
  ))

  // admin 獲得所有 user

  const adminGetAllUsers = async () => {
    try {
      const res = await adminGetAllUsersApi(1)
      await setData(res.data)
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

  const vh = Math.round(window.innerHeight)

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
            height={vh - 110}
          >
            {adminUserItemHelper}
          </InfiniteScroll>
        )}
      </div>
    </AdminUserPageGrid>
  )
}

export default AdminAllUsersPage
