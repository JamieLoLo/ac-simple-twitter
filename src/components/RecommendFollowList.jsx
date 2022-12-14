import styles from './RecommendFollowList.module.scss'
import { useEffect, useState } from 'react'
import { userGetTopUsersApi } from '../api/userApi'
import RecommendFollowItem from './RecommendFollowItem'
import { useSelector } from 'react-redux'

const RecommendFollowList = () => {
  const [userRecommendFollowData, setUserRecommendFollowData] = useState([])
  const isUpdate = useSelector((state) => state.user.isUpdate)
  // userGetFollowers
  useEffect(() => {
    const userGetTopUsers = async (data) => {
      try {
        const res = await userGetTopUsersApi(data)
        await setUserRecommendFollowData(res.data)
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetTopUsers()
  }, [isUpdate])

  const userRecommendFollowList = userRecommendFollowData.map((data) => (
    <RecommendFollowItem data={data} key={data.id} />
  ))
  return (
    <div className={styles.recommendFollowList}>
      <div className={styles.title}>推薦跟隨</div>
      {userRecommendFollowList}
    </div>
  )
}

export default RecommendFollowList
