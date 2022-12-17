import Navigation from './Navigation'
import RecommendFollowList from '../components/RecommendFollowList'
import styles from './GridSystemWrapper.module.scss'

export const AdminGrid = ({ children, pathname }) => {
  return (
    <div className='main__container'>
      <div className={`col-2 ${styles.col_2}`}>
        <Navigation condition='admin' pathname={pathname} />
      </div>
      <div className={`col-10 ${styles.col_10}`}>{children}</div>
    </div>
  )
}

export const AdminUserPageGrid = ({ children, pathname }) => {
  return (
    <div className={styles.user__list__container}>
      <div className={`col-3 ${styles.col_2} ${styles.navigation}`}>
        <Navigation condition='admin' pathname={pathname} />
      </div>
      <div className={`col-7 ${styles.user__list}`}>{children}</div>
    </div>
  )
}

export const UserGrid = ({ children, page, pathname }) => {
  return (
    <div className='main__container'>
      <div className={`col-2 ${styles.col_2}`}>
        <Navigation condition='user' pathname={pathname} />
      </div>
      <div className={`col-7 ${styles.col_7}`}>{children}</div>
      {page !== 'settingPage' && (
        <div className={`col-3 ${styles.col_3}`}>
          <RecommendFollowList />
        </div>
      )}
    </div>
  )
}
