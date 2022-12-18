import styles from './AdminAllTweetsPage.module.scss'
// --- hook
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
// --- component
import AdminTweetItem from '../components/AdminTweetItem'
import { AdminGrid } from '../Layout/GridSystemWrapper'
// --- api
import { adminGetAllTweetsApi } from '../api/adminApi'
// --- store
import { authInputActions } from '../store/authInput-slice'
// --- icons
import { ReactComponent as LoadingIcon } from '../components/assets/icons/loading.svg'

const AdminAllTweetsPage = () => {
  const dispatch = useDispatch()
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const isAllTweetsUpdate = useSelector(
    (state) => state.admin.isAllTweetsUpdate
  )
  const authToken = localStorage.getItem('authToken')

  useEffect(() => {
    dispatch(authInputActions.refreshAuthInput())
    if (authToken === null) {
      navigate('/users/login')
    }
  }, [])

  const adminTweetItemHelper = data.map((data) => (
    <AdminTweetItem data={data} key={data.id} />
  ))

  const adminGetAllTweets = async () => {
    try {
      const res = await adminGetAllTweetsApi(1)
      setData(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    adminGetAllTweets(1)
    setPage(2)
  }, [isAllTweetsUpdate, navigate])

  // lazy loading for tweet list
  const changePage = () => {
    const adminGetAllTweets = async () => {
      try {
        const res = await adminGetAllTweetsApi(page)
        setHasMore(res.data.length)
        await setData(data.concat(res.data))
        setPage((page) => page + 1)
      } catch (error) {
        console.error(error)
        navigate('/admin/login')
        localStorage.removeItem('authToken')
      }
    }
    adminGetAllTweets()
  }
  return (
    <AdminGrid pathname={pathname}>
      <div className={styles.adminAllTweets} id={'tweet__list'}>
        <div className={styles.title}>推文清單</div>
        {data.length !== 0 && (
          <InfiniteScroll
            dataLength={data.length}
            next={changePage}
            hasMore={hasMore !== 0}
            loader={<LoadingIcon className={styles.loading__icon} />}
            endMessage={null}
            scrollableTarget='tweet__list'
            height={850}
          >
            {adminTweetItemHelper}
          </InfiniteScroll>
        )}
      </div>
    </AdminGrid>
  )
}
export default AdminAllTweetsPage
