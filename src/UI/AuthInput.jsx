import React from 'react'
import styles from './AuthInput.module.scss'

const AuthInput = ({ id, auth, type, label, value, placeholder, onChange }) => {
  return (
    <div className={styles.input__container}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type || 'text'}
        className={auth}
        placeholder={placeholder || ''}
        value={value || ''}
      />
      {/* 用來顯示警告訊息 以及告知字數限字 */}
      {/* 先comment掉 等之後要做驗證再決定要放什麼參數進來 */}
      {/* <div className={styles.input__message__container}>
        <p className={styles.input__message}>message</p>
        <p className={styles.text__restriction__count}>0/50</p>
      </div> */}
    </div>
  )
}

export default AuthInput
