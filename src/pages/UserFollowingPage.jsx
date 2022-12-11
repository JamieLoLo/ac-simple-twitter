import React from 'react'
import UserFollowListItem from '../components/UserFollowListItem'
import { UserGrid } from '../Layout/GridSystemWrapper'
import { ReactComponent as PrevIcon } from '../components/assets/icons/prev.svg'
import { Link } from 'react-router-dom'
import styles from './UserFollowingPage.module.scss'

const UserFollowingPage = () => {
  return (
    <>
      <UserGrid>
        <div className={styles.follow__container}>
          <div className={styles.user__container}>
            <div className={styles.icon__container}>
              <PrevIcon />
            </div>
            <div className={styles.user__text}>
              <p className={styles.user__name}>John Doe</p>
              <p className={styles.tweet__count}>25 推文</p>
            </div>
          </div>
          <div className={styles.switch__button__container}>
            <Link to='/users/follower' className={styles.link}>
              <p className={styles.switch__button}>追隨者</p>
            </Link>
            <p className={`${styles.switch__button} ${styles.active}`}>
              正在追隨
            </p>
          </div>
          <div className={styles.follow__list__container}>
            <UserFollowListItem />
            <UserFollowListItem />
            <UserFollowListItem />
            <UserFollowListItem />
          </div>
        </div>
      </UserGrid>
    </>
  )
}

export default UserFollowingPage
