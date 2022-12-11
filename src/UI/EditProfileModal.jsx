import styles from './EditProfileModal.module.scss'
import Button from './Button'
import cover from '../components/assets/icons/cover.svg'
import cameraIcon from '../components/assets/icons/camera.svg'
import delBtn from '../components/assets/icons/delBtn_white.svg'

const EditProfileModal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.backdrop}></div>
      <div className={styles.modalContainer}>
        <div className={styles.top}>
          <div className={styles.container}>
            <div className={styles.delBtn}></div>
            <div className={styles.title}>編輯個人資料</div>
          </div>
          <Button className='button button__sm active' title='儲存' />
        </div>
        <div className={styles.coverContainer}>
          <div className={styles.icons}>
            <img src={cameraIcon} alt='camera' />
            <img src={delBtn} alt='delete' />
          </div>
          <div className={styles.backdrop}></div>
          <img src={cover} alt='cover' />
        </div>
        <div className={styles.avatarContainer}>
          <img className={styles.icon}src={cameraIcon} alt='camera' />
          <div className={styles.backdrop}></div>
          <img
            className={styles.avatar}
            src='https://pbs.twimg.com/profile_images/1465102977312636929/oXKdq9aL_400x400.jpg'
            alt='avatar'
          />
        </div>
      </div>
    </div>
  )
}

export default EditProfileModal
