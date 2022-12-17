import styles from './RecommendFollowList.module.scss'
// --- hook
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// --- component
import RecommendFollowItem from './RecommendFollowItem'
// --- api
import { userGetTopUsersApi } from '../api/userApi'
// --- store
import { userActions } from '../store/user-slice'
// --- icons

const RecommendFollowList = () => {
  const dispatch = useDispatch()
  // --- useSelector
  const isFollowUpdate = useSelector((state) => state.user.isFollowUpdate)
  const isUserInfoUpdate = useSelector((state) => state.user.isUserInfoUpdate)
  const recommendFollowData = useSelector(
    (state) => state.user.recommendFollowData
  )
  // --- useEffect
  // userGetFollowers
  useEffect(() => {
    const userGetTopUsers = async () => {
      try {
        const res = await userGetTopUsersApi()
        await dispatch(userActions.setRecommendFollowData(res.data))
      } catch (error) {
        console.error(error)
        return error
      }
    }
    userGetTopUsers()
  }, [isFollowUpdate, isUserInfoUpdate])
  // --- helper constant
  const userRecommendFollowList = recommendFollowData.map((data) => (
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
