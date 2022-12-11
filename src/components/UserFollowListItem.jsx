import React from 'react'
import styles from './UserFollowListItem.module.scss'
import defaultFig from './assets/icons/defaultFig.svg'
import Button from '../UI/Button'

const UserFollowListItem = () => {
  return (
    <div className={styles.item__container}>
      <div className={styles.avatar__container}>
        <img className={styles.avatar} src={defaultFig} alt='Default Fig' />
      </div>
      <div className={styles.info__container}>
        <div className={styles.info__header}>
          <p className={styles.user__name}>Apple</p>
          {/* <Button
            className='button button__md active'
            title='正在跟隨'
            style={{ width: '96px', height: '40px', fontSize: '14px' }}
          /> */}
          <Button
            className='button button__md'
            title='跟隨'
            style={{ width: '64px', height: '40px', fontSize: '14px' }}
          />
        </div>
        <div className={styles.info__body}>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab ipsam
            illum cumque tempore sunt asperiores sit officiis, obcaecati quos
            voluptates exercitationem, fuga laboriosam porro nostrum quia
            excepturi quod sapiente a.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserFollowListItem
