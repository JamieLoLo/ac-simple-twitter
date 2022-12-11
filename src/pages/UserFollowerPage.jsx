import React from 'react'
import { UserGrid } from '../Layout/GridSystemWrapper'
import styles from './UserFollowerPage.module.scss'

const UserFollowerPage = () => {
  return (
    <>
      <UserGrid>
        <div className={styles.follow__container}>
          <div className={styles.user__container}></div>
          <div className={styles.switch__list__button}></div>
          <div className={styles.follow__list__container}></div>
        </div>
      </UserGrid>
    </>
  )
}

export default UserFollowerPage
