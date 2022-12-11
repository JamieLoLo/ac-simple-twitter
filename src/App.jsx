import './reset.module.scss'
import './base.module.scss'
import './UI/Button.module.scss'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import UserLoginPage from './pages/UserLoginPage'
import SignUpPage from './pages/SignUpPage'
import AdminLoginPage from './pages/AdminLoginPage'
import SettingPage from './pages/SettingPage'
import AdminAllTweetsPage from './pages/AdminAllTweetsPage'
import AdminAllUsersPage from './pages/AdminAllUsersPage'
import MainPage from './pages/MainPage'
import DetailTweetPage from './pages/DetailTweetPage'
import UserProfilePage from './pages/UserProfilePage'
import UserFollowerPage from './pages/UserFollowerPage'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserFollowingPage from './pages/UserFollowingPage'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='users/profile' element={<UserProfilePage />} />
          <Route path='users/main' element={<MainPage />} />
          <Route path='users/login' element={<UserLoginPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='users/tweet' element={<DetailTweetPage />} />
          <Route path='admin/login' element={<AdminLoginPage />} />
          <Route path='admin/alltweets' element={<AdminAllTweetsPage />} />
          <Route path='admin/allusers' element={<AdminAllUsersPage />} />
          <Route path='users/setting' element={<SettingPage />} />
          <Route path='users/follower' element={<UserFollowerPage />} />
          <Route path='users/following' element={<UserFollowingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
