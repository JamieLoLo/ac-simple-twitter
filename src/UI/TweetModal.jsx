import styles from './TweetModal.module.scss'
import Button from './Button'

const TweetModal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.backdrop}></div>
      <div className={styles.modal__container}>
        <div className={styles.top}>
          <div className={styles.del__btn}></div>
        </div>
        <div className={styles.tweet__input__area}>
          <div className={styles.container}>
            <img
              className={styles.avatar}
              src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
              alt='user'
            />
            <textarea placeholder='有什麼新鮮事?' />
          </div>
          <Button
            className={`button button__md active`}
            title='推文'
            style={{ width: '66px' }}
          />
        </div>
      </div>
    </div>
  )
}

export default TweetModal
