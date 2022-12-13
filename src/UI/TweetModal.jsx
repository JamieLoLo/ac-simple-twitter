import styles from './TweetModal.module.scss'
import Button from './Button'
import AuthInput from './AuthInput'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'
import { useState } from 'react'

const TweetModal = (props) => {
  const dispatch = useDispatch()
  const tweet = useSelector((state) => state.authInput.tweet)
  const message = useSelector((state) => state.authInput.tweet.message)
  const isValid = useSelector((state) => state.authInput.tweet.isValid)
  const content = useSelector((state) => state.authInput.tweet.content)
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const tweetHandler = (useInput) => {
    dispatch(authInputActions.tweetAuth(useInput))
  }
  const refreshHandler = () => {
    dispatch(authInputActions.refreshAuthInput())
  }
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
          props.setTweetModal(false)
          refreshHandler()
          setShowErrorMessage(false)
        }}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.top}>
          <div
            className={styles.del__btn}
            onClick={() => {
              props.setTweetModal(false)
              refreshHandler()
              setShowErrorMessage(false)
            }}
          ></div>
        </div>
        <div className={styles.tweet__input__area}>
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
                onChange={tweetHandler}
                value={tweet.content}
                isValid={tweet.isValid}
                placeholder='有什麼新鮮事？'
                message={tweet.message}
                count={tweet.count}
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

export default TweetModal
