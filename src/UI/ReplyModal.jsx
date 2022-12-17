import styles from './ReplyModal.module.scss'
import Button from './Button'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import AuthInput from './AuthInput'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'
import { useEffect, useState } from 'react'
import { AddReplyApi } from '../api/replyApi'
import useMoment from '../hooks/useMoment'
import { tweetGetOneApi } from '../api/tweetApi'
import { userGetProfileApi } from '../api/userApi'
import { userActions } from '../store/user-slice'
import { modalActions } from '../store/modal-slice'

const ReplyModal = (props) => {
  const dispatch = useDispatch()
  // --- localStorage
  const userId = localStorage.getItem('userId')
  const authToken = localStorage.getItem('authToken')
  const tweetId = localStorage.getItem('tweet_id')
  // --- useState
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  // --- useSelector
  const reply = useSelector((state) => state.authInput.reply)
  const message = useSelector((state) => state.authInput.reply.message)
  const isValid = useSelector((state) => state.authInput.reply.isValid)
  const content = useSelector((state) => state.authInput.reply.content)
  const isUserInfoUpdate = useSelector((state) => state.user.isUserInfoUpdate)
  const userInfo = useSelector((state) => state.user.userInfo)
  const oneTweetData = useSelector((state) => state.user.oneTweetData)
  const { User } = oneTweetData
  const isReplyModalOpen = useSelector((state) => state.modal.isReplyModalOpen)
  // useEffect
  useEffect(() => {
    const userGetProfile = async () => {
      try {
        const res = await userGetProfileApi(userId)
        await dispatch(userActions.setUserInfo(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    if (authToken !== null) {
      userGetProfile()
    }
  }, [isUserInfoUpdate])

  useEffect(() => {
    const tweetGetOne = async () => {
      try {
        const res = await tweetGetOneApi(tweetId)
        dispatch(userActions.setOneTweetData(res.data))
      } catch (error) {
        console.error(error)
      }
    }
    if (tweetId === null) {
      return
    }
    tweetGetOne()
  }, [tweetId])

  // event Handler
  const createTime = useMoment(oneTweetData.createdAt)
  const replyHandler = (useInput) => {
    dispatch(authInputActions.replyAuth(useInput))
  }
  const refreshHandler = () => {
    dispatch(authInputActions.refreshAuthInput())
  }

  const submitHandler = async () => {
    if (content === '' || !isValid) {
      setShowErrorMessage(true)
    } else {
      try {
        await AddReplyApi(tweetId, content)
        dispatch(modalActions.setIsReplyModalOpen(false))
        refreshHandler()
        dispatch(userActions.setIsTweetUpdate())
      } catch (error) {
        console.error(error)
      }
    }
  }
  return isReplyModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => {
          dispatch(modalActions.setIsReplyModalOpen(false))
          refreshHandler()
          setShowErrorMessage(false)
        }}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.top}>
          <div
            className={styles.del__btn}
            onClick={() => {
              dispatch(modalActions.setIsReplyModalOpen(false))
              refreshHandler()
              setShowErrorMessage(false)
            }}
          ></div>
        </div>
        <div className={styles.tweet__item}>
          <div className={styles.tweet}>
            <div className={styles.tweet__info}>
              <div className={styles.avatar__container}>
                <img
                  className={styles.avatar}
                  src={User.avatar === null ? defaultFig : User.avatar}
                  alt='Default Fig'
                />
              </div>
              <div className={styles.tweet__creator__info}>
                <div className={styles.container}>
                  <div className={styles.name}>{oneTweetData.User.name}</div>
                  <div className={styles.account}>
                    @{oneTweetData.User.account}
                  </div>
                </div>
                <div className={styles.create__time}>・{createTime}</div>
              </div>
            </div>
            <div className={styles.tweet__content}>
              {oneTweetData.description}
              <div className={styles.reply__to}>
                回覆給
                <span className={styles.highlight}>
                  @{oneTweetData.User.account}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reply__input__area}>
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
              title='回覆'
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
