import styles from './RecommendFollowList.module.scss'
import defaultFig from '../components/assets/icons/defaultFig.svg'
import Button from '../UI/Button'
import { useEffect, useState } from 'react'
import { userGetTopUsersApi } from '../api/userApi'

const RecommendFollowList = () => {
  const [userRecommendFollowData, setUserRecommendFollowData] = useState([])
  // userGetFollowers
  useEffect(() => {
    const userGetTopUsers = async (data) => {
      try {
        const res = await userGetTopUsersApi(data)
        console.log(res.data)
        await setUserRecommendFollowData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetTopUsers()
  }, [])
  const RecommendFollowItem = ({ data }) => {
    const { account, avatar, isFollowed, name } = data
    return (
      <div className={styles.recommendFollowItem}>
        <div className={styles.tweetInfo}>
          <img
            className={styles.avatar}
            src={avatar ? avatar : defaultFig}
            alt='Default Fig'
          />
          <div className={styles.tweetCreatorInfo}>
            <div className={styles.name}>{name}</div>
            <div className={styles.account}>@{account}</div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          {isFollowed ? (
            <Button
              className='button active button__md'
              style={{ width: '90px', fontSize: '14px' }}
              title='正在跟隨'
            />
          ) : (
            <Button
              className='button button__md'
              style={{ width: '66px', height: '40px' }}
              title='跟隨'
            />
          )}
        </div>
      </div>
    )
  }

  const userRecommendFollowList = userRecommendFollowData.map((data) => (
    <RecommendFollowItem data={data} key={data.followerId} />
  ))
  return (
    <div className={styles.recommendFollowList}>
      <div className={styles.title}>推薦跟隨</div>
      {userRecommendFollowList}
    </div>
  )
}

export default RecommendFollowList
