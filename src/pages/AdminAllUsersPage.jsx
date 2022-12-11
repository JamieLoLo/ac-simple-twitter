import styles from './AdminAllUsersPage.module.scss'
import { AdminGrid } from '../Layout/GridSystemWrapper'
import { useLocation } from 'react-router-dom'
import AdminUserItem from '../components/AdminUserItem'
const response = [
  {
    id: 44,
    account: 'user4',
    name: 'User4',
    avatar: 'https://loremflickr.com/320/240/logo/?lock=4',
    cover: 'https://loremflickr.com/720/240/landscape/?lock=4',
    tweetsCount: 10,
    likesCount: 0,
    followingsCount: 0,
    followersCount: 0,
  },
  {
    id: 54,
    account: 'user5',
    name: 'User5',
    avatar: 'https://loremflickr.com/320/240/logo/?lock=5',
    cover: 'https://loremflickr.com/720/240/landscape/?lock=5',
    tweetsCount: 10,
    likesCount: 0,
    followingsCount: 0,
    followersCount: 0,
  },
  {
    id: 14,
    account: 'user1',
    name: 'User1',
    avatar: 'https://loremflickr.com/320/240/logo/?lock=1',
    cover: 'https://loremflickr.com/720/240/landscape/?lock=1',
    tweetsCount: 10,
    likesCount: 0,
    followingsCount: 0,
    followersCount: 0,
  },
  {
    id: 24,
    account: 'user2',
    name: 'User2',
    avatar: 'https://loremflickr.com/320/240/logo/?lock=2',
    cover: 'https://loremflickr.com/720/240/landscape/?lock=2',
    tweetsCount: 10,
    likesCount: 0,
    followingsCount: 0,
    followersCount: 0,
  },
  {
    id: 34,
    account: 'user3',
    name: 'User3',
    avatar: 'https://loremflickr.com/320/240/logo/?lock=3',
    cover: 'https://loremflickr.com/720/240/landscape/?lock=3',
    tweetsCount: 10,
    likesCount: 0,
    followingsCount: 0,
    followersCount: 0,
  },
  {
    id: 104,
    account: 'Jamielolo111',
    name: 'Jamielolo111',
    avatar: null,
    cover: null,
    tweetsCount: 0,
    likesCount: 0,
    followingsCount: 0,
    followersCount: 0,
  },
  {
    id: 64,
    account: '20221209s',
    name: '20221209',
    avatar: null,
    cover: null,
    tweetsCount: 0,
    likesCount: 0,
    followingsCount: 0,
    followersCount: 0,
  },
  {
    id: 4,
    account: 'root',
    name: 'Root',
    avatar: null,
    cover: null,
    tweetsCount: 0,
    likesCount: 0,
    followingsCount: 0,
    followersCount: 0,
  },
  {
    id: 74,
    account: 'Jamielolo',
    name: 'Jamielolo',
    avatar: null,
    cover: null,
    tweetsCount: 0,
    likesCount: 0,
    followingsCount: 0,
    followersCount: 0,
  },
  {
    id: 84,
    account: 'Jamielolo1',
    name: 'Jamielolo1',
    avatar: null,
    cover: null,
    tweetsCount: 0,
    likesCount: 0,
    followingsCount: 0,
    followersCount: 0,
  },
  {
    id: 94,
    account: 'Jamielolo11',
    name: 'Jamielolo11',
    avatar: null,
    cover: null,
    tweetsCount: 0,
    likesCount: 0,
    followingsCount: 0,
    followersCount: 0,
  },
]

const AdminAllUsersPage = () => {
  const pathname = useLocation().pathname
  const adminUserItemHelper = response.map((data) => 
    <AdminUserItem data={data} key={data.id} />
  )
  return (
    <AdminGrid pathname={pathname}>
      <div className={styles.title}>使用者列表</div>
      <div className={styles.userCardList}>{adminUserItemHelper}</div>
    </AdminGrid>
  )
}

export default AdminAllUsersPage
