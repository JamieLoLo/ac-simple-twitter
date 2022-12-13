import styles from './ReplyModal.module.scss'
import Button from './Button'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import AuthInput from './AuthInput'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'
import { useState } from 'react'

const ReplyModal = (props) => {
  const dispatch = useDispatch()
  const reply = useSelector((state) => state.authInput.reply)
  const message = useSelector((state) => state.authInput.reply.message)
  const isValid = useSelector((state) => state.authInput.tweet.isValid)
  const content = useSelector((state) => state.authInput.tweet.content)
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const replyHandler = (useInput) => {
    dispatch(authInputActions.replyAuth(useInput))
  }
  const refreshHandler = () => {
    dispatch(authInputActions.refreshAuthInput())
  }
  const currentTime = '3 小時'
  const submitHandler = () => {
    if (content === '' || !isValid) {
      setShowErrorMessage(true)
    }
  }
  return props.trigger ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => {
          props.setReplyModal(false)
          refreshHandler()
          setShowErrorMessage(false)
        }}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.top}>
          <div
            className={styles.del__btn}
            onClick={() => {
              props.setReplyModal(false)
              refreshHandler()
              setShowErrorMessage(false)
            }}
          ></div>
        </div>
        <div className={styles.tweet__item}>
          <div className={styles.tweet}>
            <div className={styles.tweet__info}>
              <img
                className={styles.avatar}
                src={defaultFig}
                alt='Default Fig'
              />
              <div className={styles.tweet__creator__info}>
                <div className={styles.container}>
                  <div className={styles.name}>Apple</div>
                  <div className={styles.account}>@apple</div>
                </div>
                <div className={styles.create__time}>・{currentTime}</div>
              </div>
            </div>
            <div className={styles.tweet__content}>
              哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
              <div className={styles.reply__to}>
                回覆給<span className={styles.highlight}> @apple</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reply__input__area}>
          <div className={styles.container}>
            <img
              className={styles.avatar}
              src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
              alt='user'
            />
            <div className={styles.auth__input__container}>
              <AuthInput
                style={{
                  width: '528px',
                  height: '150px',
                }}
                onChange={replyHandler}
                value={reply.content}
                isValid={reply.isValid}
                placeholder='推你的回覆'
                message={reply.message}
                count={reply.count}
                upperLimit='140'
                modal={true}
                textArea={true}
              />
            </div>
          </div>
          <div className={styles.footer}>
            {showErrorMessage && (
              <p className={styles.input__message}>{message}</p>
            )}
            <Button
              className={`button button__md active`}
              title='推文'
              style={{ width: '66px' }}
              onClick={submitHandler}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default ReplyModal
