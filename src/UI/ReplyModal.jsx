import styles from './ReplyModal.module.scss'
import Button from './Button'
import defaultFig from '../components/assets/icons/defaultFig.svg'

const ReplyModal = () => {
  const currentTime = '3 小時'
  return (
    <div className={styles.modal}>
      <div className={styles.backdrop}></div>
      <div className={styles.modal__container}>
        <div className={styles.top}>
          <div className={styles.del__btn}></div>
        </div>
        <div className={styles.tweet__item}>
          <div className={styles.tweet}>
            <div className={styles.tweet__info}>
              <img
                className={styles.avatar}
                src={defaultFig}
                alt='Default Fig'
              />
              <div className={styles.tweet__creator__info}>
                <div className={styles.container}>
                  <div className={styles.name}>Apple</div>
                  <div className={styles.account}>@apple</div>
                </div>
                <div className={styles.create__time}>・{currentTime}</div>
              </div>
            </div>
            <div className={styles.tweet__content}>
              哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
              <div className={styles.reply__to}>
                回覆給<span className={styles.highlight}>{" "}@apple</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reply__input__area}>
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

export default ReplyModal
