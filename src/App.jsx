import './reset.module.scss'
import './base.module.scss'
import './UI/Button.module.scss'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import UserLoginPage from './pages/UserLoginPage'
import SignUpPage from './pages/SignUpPage'
import AdminLoginPage from './pages/AdminLoginPage'
import SettingPage from './pages/SettingPage'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='users/login' element={<UserLoginPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='admin/login' element={<AdminLoginPage />} />
          <Route path='users/setting' element={<SettingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
