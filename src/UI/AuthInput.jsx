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
  textArea,
  modal,
}) => {
  return (
    <div className={styles.input__container} style={style}>
      {!modal && <label htmlFor={id}>{label}</label>}
      {!textArea && (
        <input
          id={id}
          className={clsx('', {
            error__baseline: !isValid && count !== 0,
          })}
          type={type || 'text'}
          placeholder={placeholder || ''}
          value={value || ''}
          onChange={(event) => {
            onChange?.(event.target.value)
          }}
        />
      )}
      {textArea && (
        <textarea
          id={id}
          className={clsx('', {
            error__baseline: !isValid && count !== 0,
          })}
          type={type || 'text'}
          placeholder={placeholder || ''}
          value={value || ''}
          onChange={(event) => {
            onChange?.(event.target.value)
          }}
        ></textarea>
      )}
      {!isValid && count !== 0 && !modal && (
        <div
          className={clsx('', 'input__message__container', {
            error__message__container: !isValid,
          })}
        >
          {count !== 0 && message && (
            <p className={styles.input__message}>{message}</p>
          )}
          <p className={styles.text__restriction__count}>
            {count !== undefined && count !== 0 && `${count} / ${upperLimit}`}
          </p>
        </div>
      )}
    </div>
  )
}

export default AuthInput
