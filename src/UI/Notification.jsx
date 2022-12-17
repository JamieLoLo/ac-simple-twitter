import React from 'react'
import SuccessIcon from '../components/assets/icons/success.png'
import ErrorIcon from '../components/assets/icons/error.png'
import WarnIcon from '../components/assets/icons/warn.png'
import NewIcon from '../components/assets/icons/new.png'
import { ReactComponent as LoadingIcon } from '../components/assets/icons/loading.svg'

import styles from './Notification.module.scss'

const Notification = ({ notification, title, title2 }) => {
  return (
    <div>
      {notification === 'success' && (
        <div className={styles.notification__container}>
          <p className={styles.notification__text}>{title}</p>
          <div className={styles.icon__success__container}>
            <img
              className={styles.icon__success}
              src={SuccessIcon}
              alt='success-icon'
            />
          </div>
        </div>
      )}
      {notification === 'error' && (
        <div className={styles.notification__container}>
          <p className={styles.notification__text}>{title}</p>
          <div className={styles.icon__error__container}>
            <img
              className={styles.icon__error}
              src={ErrorIcon}
              alt='error-icon'
            />
          </div>
        </div>
      )}
      {notification === 'warn' && (
        <div className={styles.notification__container}>
          <p className={styles.notification__text}>{title}</p>
          <div className={styles.icon__warn__container}>
            <img className={styles.icon__warn} src={WarnIcon} alt='warn-icon' />
          </div>
        </div>
      )}
      {notification === 'new' && (
        <div className={styles.notification__container}>
          <p className={styles.notification__text}>{title}</p>
          <div className={styles.icon__new__container}>
            <img className={styles.icon__new} src={NewIcon} alt='warn-icon' />
          </div>
        </div>
      )}
      {notification === 'loading' && (
        <div className={styles.notification__container}>
          <div className={styles.text__container}>
            <p className={styles.notification__text}>{title}</p>
            <br />
            <p
              className={`${styles.notification__text} ${styles.loading__text}`}
            >
              {title2}
            </p>
          </div>
          <LoadingIcon className={styles.loading__icon} />
        </div>
      )}
    </div>
  )
}

export default Notification
