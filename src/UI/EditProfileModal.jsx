import styles from './EditProfileModal.module.scss'
// --- hook
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
// --- component
import { Button, AuthInput, Notification } from './index'
// --- api
import { editProfileApi } from '../api/userApi'
// --- store
import { authInputActions } from '../store/authInput-slice'
import { userActions } from '../store/user-slice'
import { modalActions } from '../store/modal-slice'
// --- icons
import { cover, defaultFig, delBtn } from '../components/assets/icons/index'

const EditProfileModal = (props) => {
  const dispatch = useDispatch()
  const formData = new FormData()
  // --- localStorage
  const userId = Number(localStorage.getItem('userId'))
  // --- useState
  const [editCoverUrl, setEditCoverUrl] = useState()
  const [editAvatarUrl, setEditAvatarUrl] = useState()
  const [editCoverFile, setEditCoverFile] = useState()
  const [editAvatarFile, setEditAvatarFile] = useState()
  const [loadingStatus, setLoadingStatus] = useState('finish')
  const [authInput, setAuthInput] = useState('finish')
  const [isStart, setIsStart] = useState(false)
  const [coverKey, setCoverKey] = useState(Math.random())
  // --- useSelector
  const username = useSelector((state) => state.authInput.username)
  const info = useSelector((state) => state.authInput.info)
  const editUsername = useSelector((state) => state.authInput.editUsername)
  const editInfo = useSelector((state) => state.authInput.editInfo)
  const isEditProfileModalOpen = useSelector(
    (state) => state.modal.isEditProfileModalOpen
  )
  const [name, setName] = useState(props.data.name)
  const [infoValue, setInfoValue] = useState(props.data.introduction)

  // --- useEffect
  useEffect(() => {
    setIsStart(true)
    setEditCoverUrl(props.data.cover)
    setEditAvatarUrl(props.data.avatar)
  }, [isStart, props.data.avatar, props.data.cover])

  useEffect(() => {
    if (authInput === 'failed') {
      setTimeout(() => {
        setAuthInput('finish')
      }, 1500)
    }
  }, [authInput])

  // --- event handler
  const usernameHandler = (userInput) => {
    dispatch(authInputActions.usernameAuth(userInput))
  }
  const infoHandler = (userInput) => {
    dispatch(authInputActions.infoAuth(userInput))
  }
  const editUsernameHandler = () => {
    dispatch(authInputActions.editUsernameAuth(name))
  }
  const editInfoHandler = () => {
    dispatch(authInputActions.editInfoAuth(infoValue))
  }
  const refreshHandler = () => {
    dispatch(authInputActions.refreshAuthInput())
    setIsStart(false)
    setEditAvatarFile('')
    setEditCoverFile('')
    setEditAvatarUrl('')
    setEditCoverUrl('')
    dispatch(modalActions.setIsEditProfileModalOpen(false))
  }
  const changeCoverHandler = async (event) => {
    setEditCoverUrl(URL.createObjectURL(event.target.files[0]))
    setEditCoverFile(event.target.files[0])
  }

  const changeAvatarHandler = (event) => {
    setEditAvatarUrl(URL.createObjectURL(event.target.files[0]))
    setEditAvatarFile(event.target.files[0])
  }

  const saveProfileHandler = async () => {
    await setLoadingStatus('loading')

    if (username.content.length === 0) {
      formData.append('name', props.data.name)
    } else {
      formData.append('name', username.content)
    }

    if (info.content.length === 0) {
      formData.append('introduction', '')
    } else {
      formData.append('introduction', info.content)
    }

    formData.append('cover', editCoverFile)
    formData.append('avatar', editAvatarFile)
    const res = await editProfileApi(userId, formData)
    if (res.status === 200) {
      dispatch(userActions.setIsUserInfoUpdate())
      dispatch(userActions.setIsTweetUpdate)
      await setLoadingStatus('finish')
      dispatch(modalActions.setIsEditProfileModalOpen(false))
      refreshHandler()
      return
    }
  }
  return isEditProfileModalOpen ? (
    <>
      <div className={styles.notification__container}>
        {authInput === 'failed' && (
          <Notification notification='error' title='請輸入正確格式' />
        )}
      </div>
      <div className={styles.modal}>
        <div
          className={styles.backdrop}
          onClick={() => {
            refreshHandler()
            setName(props.data.name)
            setInfoValue(props.data.introduction)
          }}
        ></div>
        <div className={styles.modal__container}>
          {loadingStatus === 'loading' && (
            <div className={styles.loadingMessage}>設定中請稍候</div>
          )}
          {loadingStatus === 'finish' && (
            <>
              <div className={styles.top}>
                <div className={styles.container}>
                  <div
                    className={styles.del__btn}
                    onClick={() => {
                      refreshHandler()
                      setName(props.data.name)
                      setInfoValue(props.data.introduction)
                    }}
                  ></div>
                  <div className={styles.title}>編輯個人資料</div>
                </div>
                <Button
                  className='button button__sm active'
                  title='儲存'
                  onClick={() => {
                    if (username.count > 50 || info.count > 160) {
                      setAuthInput('failed')
                    } else {
                      saveProfileHandler()
                    }
                  }}
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
                      key={coverKey}
                    />
                  </div>
                  <img
                    src={delBtn}
                    alt='delete'
                    onClick={() => {
                      setEditCoverUrl(props.data.cover)
                      setCoverKey(Math.random())
                      setEditCoverFile()
                    }}
                  />
                </div>
                <div className={styles.backdrop}></div>
                <img
                  src={editCoverUrl ? editCoverUrl : cover}
                  alt='cover'
                  className={styles.cover}
                />
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
                  onChange={(userInput) => {
                    usernameHandler(userInput)
                    editUsernameHandler(setName(userInput))
                  }}
                  value={name}
                  isValid={username.isValid}
                  message={username.message}
                  count={username.count}
                  upperLimit='50'
                  placeholder={props.data.name}
                />
                <AuthInput
                  label='自我介紹'
                  textArea={true}
                  style={{ width: '602px' }}
                  onChange={(userInput) => {
                    infoHandler(userInput)
                    editInfoHandler(setInfoValue(userInput))
                  }}
                  value={infoValue}
                  isValid={info.isValid}
                  message={info.message}
                  count={info.count}
                  upperLimit='160'
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    ''
  )
}

export default EditProfileModal
