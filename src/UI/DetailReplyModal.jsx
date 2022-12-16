import styles from './DetailReplyModal.module.scss'
import Button from './Button'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import AuthInput from './AuthInput'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'
import { useState } from 'react'
import { AddReplyApi } from '../api/replyApi'
import { useNavigate } from 'react-router-dom'
import useMoment from '../hooks/useMoment'

const DetailReplyModal = (props) => {
  const dispatch = useDispatch()
  const reply = useSelector((state) => state.authInput.reply)
  const message = useSelector((state) => state.authInput.reply.message)
  const isValid = useSelector((state) => state.authInput.reply.isValid)
  const content = useSelector((state) => state.authInput.reply.content)
  const userAvatar = useSelector((state) => state.user.userInfo.avatar)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const navigate = useNavigate()
  const replyHandler = (useInput) => {
    dispatch(authInputActions.replyAuth(useInput))
  }
  const refreshHandler = () => {
    dispatch(authInputActions.refreshAuthInput())
  }

  const tweetId = localStorage.getItem('tweet_id')
  const createTime = useMoment(props.tweetData.createdAt)

  const submitHandler = () => {
    if (content === '' || !isValid) {
      setShowErrorMessage(true)
    } else {
      const AddReply = async () => {
        try {
          const res = await AddReplyApi(tweetId, content)
          props.setDetailReplyModal(false)
          localStorage.setItem('reply_id', res.data.id)
          refreshHandler()
        } catch (error) {
          console.error(error)
        }
      }
      AddReply()
    }
  }

  return props.trigger ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => {
          props.setDetailReplyModal(false)
          refreshHandler()
          setShowErrorMessage(false)
        }}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.top}>
          <div
            className={styles.del__btn}
            onClick={() => {
              props.setDetailReplyModal(false)
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
                  src={defaultFig}
                  alt='Default Fig'
                />
              </div>
              <div className={styles.tweet__creator__info}>
                <div className={styles.container}>
                  <div className={styles.name}>{props.tweetData.User.name}</div>
                  <div className={styles.account}>
                    @ {props.tweetData.User.account}
                  </div>
                </div>
                <div className={styles.create__time}>・{createTime}</div>
              </div>
            </div>
            <div className={styles.tweet__content}>
              {props.tweetData.description}
              <div className={styles.reply__to}>
                回覆給
                <span className={styles.highlight}>
                  {' '}
                  @{props.tweetData.User.account}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reply__input__area}>
          <div className={styles.container}>
            <img
              className={styles.avatar}
              src={userAvatar === null ? defaultFig : userAvatar}
              alt='Default Fig'
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

export default DetailReplyModal
