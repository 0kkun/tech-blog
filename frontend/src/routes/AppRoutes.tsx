import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { AdminLogin } from '../pages/admin/AdminLogin'
import { AdminHome } from '../pages/admin/AdminHome'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
