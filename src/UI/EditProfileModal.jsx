import styles from './EditProfileModal.module.scss'
import Button from './Button'
import cover from '../components/assets/icons/cover.svg'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import delBtn from '../components/assets/icons/delBtn_white.svg'
import AuthInput from './AuthInput'
import { useSelector, useDispatch } from 'react-redux'
import { authInputActions } from '../store/authInput-slice'
import { useEffect, useState } from 'react'
import { editProfileApi, userGetProfileApi } from '../api/userApi'
import { userActions } from '../store/user-slice'

const EditProfileModal = (props) => {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.authInput.username)
  const info = useSelector((state) => state.authInput.info)
  const userInfo = useSelector((state) => state.user.userInfo)
  const [editCoverUrl, setEditCoverUrl] = useState()
  const [editAvatarUrl, setEditAvatarUrl] = useState()
  const [editCoverFile, setEditCoverFile] = useState()
  const [editAvatarFile, setEditAvatarFile] = useState()
  const userId = localStorage.getItem('userId')
  const formData = new FormData()
  // userGetProfile
  useEffect(() => {
    const userGetProfile = async (data) => {
      try {
        const res = await userGetProfileApi(data)
        const result = res.data
        const {avatar, cover} = result
        setEditAvatarUrl(avatar)
        setEditCoverUrl(cover)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetProfile(userId)
  }, [userId])
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

  const saveProfileHandler = async () => {
    await editProfileApi(userId, formData)
    await dispatch(userActions.setIsUpdate())
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
