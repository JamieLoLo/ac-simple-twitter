import styles from './AdminAllUsersPage.module.scss'
import { AdminGrid } from '../Layout/GridSystemWrapper'
import cover from '../components/assets/icons/cover.svg'
import { useLocation } from 'react-router-dom'


const AdminAllUsersPage = () => {
  const pathname = useLocation().pathname
  const UserCard = () => {
    return (
      <div className={styles.userCard}>
        <img className={styles.cover} src={cover} alt='cover' />
        <img
          className={styles.avatar}
          src='https://media-s3-us-east-1.ceros.com/forbes/images/2021/12/06/bbff530cddcb7ed1b79ecee931f9f854/artboard-2-copy-6.jpg'
          alt='avatar'
        />
        <div className={styles.info}>
          <div className={styles.name}>John Doe</div>
          <div className={styles.account}>@heyjohn</div>
          <div className={styles.tweetInfo}>
            <div className={styles.tweetNum}>
              <div className={styles.icon}></div>
              <div className={styles.num}>1.5k</div>
            </div>
            <div className={styles.likeNum}>
              <div className={styles.icon}></div>
              <div className={styles.num}>20k</div>
            </div>
          </div>
          <div className={styles.followInfo}>
            <p>
              34個<span className={styles.sub}>跟隨中</span>
            </p>

            <p>
              59位<span className={styles.sub}>跟隨者</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <AdminGrid pathname={pathname}>
      <div className={styles.title}>使用者列表</div>
      <div className={styles.userCardList}>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </AdminGrid>
  )
}

export default AdminAllUsersPage
