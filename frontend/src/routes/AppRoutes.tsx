import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { AdminLogin } from '../pages/admin/AdminLogin'
import { AdminHome } from '../pages/admin/AdminHome'
import { AdminCreateArticle } from '../pages/admin/AdminCreateArticle'
import { AdminIndexArticle } from '../pages/admin/AdminIndexArticle'
import { AdminDraftIndexArticle } from '../pages/admin/AdminDraftIndexArticle'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/articles" element={<AdminIndexArticle />} />
      <Route path="/admin/article/create" element={<AdminCreateArticle />} />
      <Route path="/admin/article/drafts" element={<AdminDraftIndexArticle />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
