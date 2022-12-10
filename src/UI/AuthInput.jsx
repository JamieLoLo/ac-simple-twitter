import clsx from 'clsx'
import React from 'react'
import styles from './AuthInput.module.scss'

const AuthInput = ({
  id,
  style,
  type,
  label,
  value,
  placeholder,
  onChange,
  isValid,
  message,
  count,
  upperLimit,
}) => {
  return (
    <div className={styles.input__container} style={style}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={clsx('', {
          error__baseline: !isValid,
        })}
        type={type || 'text'}
        placeholder={placeholder || ''}
        value={value || ''}
        onChange={(event) => {
          onChange?.(event.target.value)
        }}
      />
      {!isValid && (
        <div
          className={clsx('', 'input__message__container', {
            error__message__container: !isValid,
          })}
        >
          <p className={styles.input__message}>{message}</p>
          <p className={styles.text__restriction__count}>
            {count !== undefined && `${count} / ${upperLimit}`}
          </p>
        </div>
      )}
    </div>
  )
}

export default AuthInput
