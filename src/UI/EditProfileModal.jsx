import styles from './EditProfileModal.module.scss'
// --- hook
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
// --- component
import { Button, AuthInput } from './index'
// --- api
import { editProfileApi } from '../api/userApi'
// --- store
import { authInputActions } from '../store/authInput-slice'
import { userActions } from '../store/user-slice'
// --- icons
import { cover, defaultFig, delBtn } from '../components/assets/icons/index'

const EditProfileModal = (props) => {
  const dispatch = useDispatch()
  const formData = new FormData()
  // --- localStorage
  const userId = localStorage.getItem('userId')
  // --- useState
  const [editCoverUrl, setEditCoverUrl] = useState()
  const [editAvatarUrl, setEditAvatarUrl] = useState()
  const [editCoverFile, setEditCoverFile] = useState()
  const [editAvatarFile, setEditAvatarFile] = useState()
  // --- useSelector
  const username = useSelector((state) => state.authInput.username)
  const info = useSelector((state) => state.authInput.info)
  const userInfo = useSelector((state) => state.user.userInfo)

  // --- useEffect
  useEffect(() => {
    setEditAvatarUrl(userInfo.avatar)
    setEditCoverUrl(userInfo.cover)
  }, [])

  // --- event handler
  const usernameHandler = (useInput) => {
    dispatch(authInputActions.usernameAuth(useInput))
  }
  const infoHandler = (useInput) => {
    dispatch(authInputActions.infoAuth(useInput))
  }
  const refreshHandler = () => {
    dispatch(authInputActions.refreshAuthInput())
  }
  const changeCoverHandler = (event) => {
    setEditCoverUrl(URL.createObjectURL(event.target.files[0]))
    setEditCoverFile(event.target.files[0])
  }
  const changeAvatarHandler = (event) => {
    setEditAvatarUrl(URL.createObjectURL(event.target.files[0]))
    setEditAvatarFile(event.target.files[0])
  }
  const saveProfileHandler = async () => {
    if (username.content.length === 0) {
      formData.append('name', userInfo.name)
    } else {
      formData.append('name', username.content)
    }

    if (info.content.length === 0) {
      formData.append('introduction', userInfo.introduction)
    } else {
      formData.append('introduction', info.content)
    }
    formData.append('cover', editCoverFile)
    formData.append('avatar', editAvatarFile)
    await editProfileApi(userId, formData)
    dispatch(userActions.setIsUserInfoUpdate())
    props.setEditModal(false)
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
          <Button
            className='button button__sm active'
            title='儲存'
            onClick={saveProfileHandler}
          />
        </div>
        <div className={styles.cover__container}>
          <div className={styles.icons}>
            <div className={styles.upload}>
              <label htmlFor='uploadCover'></label>
              <input
                id='uploadCover'
                type='file'
                accept='image/png'
                onChange={changeCoverHandler}
              />
            </div>
            <img
              src={delBtn}
              alt='delete'
              onClick={() => {
                setEditCoverUrl(cover)
              }}
            />
          </div>
          <div className={styles.backdrop}></div>
          <img src={editCoverUrl ? editCoverUrl : cover} alt='cover' />
        </div>
        <div className={styles.avatar__container}>
          <div className={styles.upload}>
            <label htmlFor='uploadAvatar' />
            <input
              id='uploadAvatar'
              type='file'
              accept='image/png'
              onChange={changeAvatarHandler}
            />
          </div>
          <div className={styles.backdrop}></div>
          <img
            className={styles.avatar}
            src={editAvatarUrl ? editAvatarUrl : defaultFig}
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
          />
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default EditProfileModal
