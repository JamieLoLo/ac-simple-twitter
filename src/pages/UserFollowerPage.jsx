import React from 'react'
import { UserGrid } from '../Layout/GridSystemWrapper'
import { ReactComponent as PrevIcon } from '../components/assets/icons/prev.svg'
import UserFollowListItem from '../components/UserFollowListItem'
import styles from './UserFollowerPage.module.scss'

const UserFollowerPage = () => {
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
            <p className={`${styles.switch__button} ${styles.active}`}>
              追隨者
            </p>
            <p className={styles.switch__button}>正在追隨</p>
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

export default UserFollowerPage
