import './reset.module.scss'
import './base.module.scss'
import './UI/Button.module.scss'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import {
  UserLoginPage,
  SignUpPage,
  AdminLoginPage,
  SettingPage,
  AdminAllTweetsPage,
  AdminAllUsersPage,
  MainPage,
  DetailTweetPage,
  UserProfilePage,
  UserFollowerPage,
  UserFollowingPage,
  HomePage,
} from './pages/index'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// const basename = process.env.PUBLIC_URL

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='signup' element={<SignUpPage />} />
          <Route path='admin/login' element={<AdminLoginPage />} />
          <Route path='admin/alltweets' element={<AdminAllTweetsPage />} />
          <Route path='admin/allusers' element={<AdminAllUsersPage />} />
          <Route path='users/profile' element={<UserProfilePage />} />
          <Route path='users/main' element={<MainPage />} />
          <Route path='users/login' element={<UserLoginPage />} />
          <Route path='users/tweet' element={<DetailTweetPage />} />
          <Route path='users/setting' element={<SettingPage />} />
          <Route path='users/follower' element={<UserFollowerPage />} />
          <Route path='users/following' element={<UserFollowingPage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
