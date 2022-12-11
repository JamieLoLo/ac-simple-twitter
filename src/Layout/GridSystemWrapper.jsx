import Navigation from './Navigation'
import RecommendFollowList from '../components/RecommendFollowList'
import styles from './GridSystemWrapper.module.scss'

export const AdminGrid = ({ children }) => {
  return (
    <div className='main__container'>
      <div className={`col-2 ${styles.col_2}`}>
        <Navigation condition='admin' />
      </div>
      <div className={`col-10 ${styles.col_10}`}>{children}</div>
    </div>
  )
}

export const UserGrid = ({ children }) => {
  return (
    <div className='main__container'>
      <div className={`col-2 ${styles.col_2}`}>
        <Navigation condition='user' />
      </div>
      <div className={`col-7 ${styles.col_7}`}>{children}</div>
      <div className={`col-3 ${styles.col_3}`}>
        <RecommendFollowList />
      </div>
    </div>
  )
}