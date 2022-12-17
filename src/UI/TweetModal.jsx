import styles from './TweetModal.module.scss'
import Button from './Button'
import AuthInput from './AuthInput'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'
import { useState } from 'react'
import { tweetPostApi } from '../api/tweetApi'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import { userActions } from '../store/user-slice'
import { modalActions } from '../store/modal-slice'

const TweetModal = (props) => {
  const dispatch = useDispatch()
  // --- useState
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  // --- useSelector
  const tweet = useSelector((state) => state.authInput.tweet)
  const message = useSelector((state) => state.authInput.tweet.message)
  const isValid = useSelector((state) => state.authInput.tweet.isValid)
  const content = useSelector((state) => state.authInput.tweet.content)
  const userInfo = useSelector((state) => state.user.userInfo)
  const isTweetModalOpen = useSelector((state) => state.modal.isTweetModalOpen)
  // --- useEffect

  const tweetHandler = (useInput) => {
    dispatch(authInputActions.tweetAuth(useInput))
  }
  const refreshHandler = () => {
    dispatch(authInputActions.refreshAuthInput())
  }
  const submitHandler = async () => {
    if (content === '' || !isValid) {
      setShowErrorMessage(true)
    } else {
      try {
        await tweetPostApi(content)
        dispatch(modalActions.setIsTweetModalOpen(false))
        props.setSubmitReRender(true)
        refreshHandler()
        dispatch(userActions.setIsTweetUpdate())
      } catch (error) {
        console.error(error)
      }
    }
  }

  return isTweetModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => {
          dispatch(modalActions.setIsTweetModalOpen(false))
          refreshHandler()
          setShowErrorMessage(false)
        }}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.top}>
          <div
            className={styles.del__btn}
            onClick={() => {
              dispatch(modalActions.setIsTweetModalOpen(false))
              refreshHandler()
              setShowErrorMessage(false)
            }}
          ></div>
        </div>
        <div className={styles.tweet__input__area}>
          <div className={styles.container}>
            <img
              className={styles.avatar}
              src={userInfo.avatar === null ? defaultFig : userInfo.avatar}
              alt='avatar'
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
