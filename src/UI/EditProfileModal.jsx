import styles from './EditProfileModal.module.scss'
import Button from './Button'
import cover from '../components/assets/icons/cover.svg'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import cameraIcon from '../components/assets/icons/camera.svg'
import delBtn from '../components/assets/icons/delBtn_white.svg'
import AuthInput from './AuthInput'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'

const EditProfileModal = (props) => {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.authInput.username)
  const info = useSelector((state) => state.authInput.info)
  const userInfo = useSelector((state) => state.user.userInfo)
  console.log(userInfo)
  const usernameHandler = (useInput) => {
    dispatch(authInputActions.usernameAuth(useInput))
  }
  const infoHandler = (useInput) => {
    dispatch(authInputActions.infoAuth(useInput))
  }
  const refreshHandler = () => {
    dispatch(authInputActions.refreshAuthInput())
  }

  return props.trigger ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => {
          props.setEditModal(false)
          refreshHandler()
        }}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.top}>
          <div className={styles.container}>
            <div
              className={styles.del__btn}
              onClick={() => {
                props.setEditModal(false)
                refreshHandler()
              }}
            ></div>
            <div className={styles.title}>編輯個人資料</div>
          </div>
          <Button className='button button__sm active' title='儲存' />
        </div>
        <div className={styles.cover__container}>
          <div className={styles.icons}>
            <img src={cameraIcon} alt='camera' />
            <img src={delBtn} alt='delete' />
          </div>
          <div className={styles.backdrop}></div>
          <img src={userInfo.cover ? userInfo.cover : cover} alt='cover' />
        </div>
        <div className={styles.avatar__container}>
          <img className={styles.icon} src={cameraIcon} alt='camera' />
          <div className={styles.backdrop}></div>
          <img
            className={styles.avatar}
            src={userInfo.avatar ? userInfo.avatar : defaultFig}
            alt='avatar'
          />
        </div>
        <div className={styles.auth__input__container}>
          <AuthInput
            label='名稱'
            style={{ width: '602px' }}
            onChange={usernameHandler}
            value={username.content}
            isValid={username.isValid}
            message={username.message}
            count={username.count}
            upperLimit='50'
            placeholder={userInfo.name}
          />
          <AuthInput
            label='自我介紹'
            textArea={true}
            style={{ width: '602px' }}
            onChange={infoHandler}
            value={info.content}
            isValid={info.isValid}
            message={info.message}
            count={info.count}
            upperLimit='160'
            placeholder={userInfo.introduction}
          />
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default EditProfileModal
