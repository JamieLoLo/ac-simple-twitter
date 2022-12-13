import React from 'react'
import styles from './UserFollowListItem.module.scss'
import defaultFig from './assets/icons/defaultFig.svg'
import Button from '../UI/Button'

const UserFollowListItem = (data) => {
  const { avatar, introduction, name, isFollowed } = data.data
  const defaultIntro = `Hello! I'm ${name} without introduction.`
  return (
    <div className={styles.item__container}>
      <div className={styles.avatar__container}>
        <img
          className={styles.avatar}
          src={avatar ? avatar : defaultFig}
          alt='avatar'
        />
      </div>
      <div className={styles.info__container}>
        <div className={styles.info__header}>
          <p className={styles.user__name}>{name}</p>
          <div className={styles.button__container}>
            {isFollowed ? (
              <Button
                className='button button__md active'
                title='正在跟隨'
                style={{ width: '96px', height: '40px', fontSize: '14px' }}
              />
            ) : (
              <Button
                className='button button__md'
                title='跟隨'
                style={{ width: '64px', height: '40px', fontSize: '14px' }}
              />
            )}
          </div>
        </div>
        <div className={styles.info__body}>
          <p>{introduction || defaultIntro}</p>
        </div>
      </div>
    </div>
  )
}

export default UserFollowListItem
