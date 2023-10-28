import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/user/Home'
import { AdminLogin } from '../pages/admin/AdminLogin'
import { AdminHome } from '../pages/admin/AdminHome'
import { AdminCreateArticle } from '../pages/admin/AdminCreateArticle'
import { AdminIndexArticle } from '../pages/admin/AdminIndexArticle'
import { AdminDraftIndexArticle } from '../pages/admin/AdminDraftIndexArticle'
import { AdminEditArticle } from '../pages/admin/AdminEditArticle'
import { AdminIndexTag } from '../pages/admin/AdminIndexTag'
import { Article } from '../pages/user/Article'

export const PATH = {
  adminHome: '/admin',
  adminLogin: '/admin/login',
  adminArticles: '/admin/articles',
  adminArticleCreate: '/admin/article/create',
  adminArticleDrafts: '/admin/article/drafts',
  adminTag: '/admin/tag',
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATH.adminLogin} element={<AdminLogin />} />
      <Route path={PATH.adminHome} element={<AdminHome />} />
      <Route path={PATH.adminArticles} element={<AdminIndexArticle />} />
      <Route path={PATH.adminArticleCreate} element={<AdminCreateArticle />} />
      <Route path="/admin/article/edit/:articleId" element={<AdminEditArticle />} />
      <Route path={PATH.adminArticleDrafts} element={<AdminDraftIndexArticle />} />
      <Route path={PATH.adminTag} element={<AdminIndexTag />} />
      <Route path="/" element={<Home />} />
      <Route path="/article/:articleId" element={<Article />} />
    </Routes>
  )
}
