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
import { RouteAuthGuard } from './RouteAuthGuard'
import { NotFound } from '../pages/NotFound'

export const PATH = {
  adminHome: '/admin',
  adminLogin: '/admin/login',
  adminArticles: '/admin/articles',
  adminArticle: '/admin/article/edit/:articleId',
  adminArticleCreate: '/admin/article/create',
  adminArticleDrafts: '/admin/article/drafts',
  adminTag: '/admin/tag',
}

export const AppRoutes = () => {
  return (
    <Routes>
      {/* ******** Admin ******** */}
      <Route path={PATH.adminLogin} element={<AdminLogin />} />
      <Route
        path={PATH.adminHome}
        element={<RouteAuthGuard component={<AdminHome />} redirect={PATH.adminLogin} />}
      />
      <Route
        path={PATH.adminArticles}
        element={<RouteAuthGuard component={<AdminIndexArticle />} redirect={PATH.adminLogin} />}
      />
      <Route
        path={PATH.adminArticleCreate}
        element={<RouteAuthGuard component={<AdminCreateArticle />} redirect={PATH.adminLogin} />}
      />
      <Route
        path={PATH.adminArticle}
        element={<RouteAuthGuard component={<AdminEditArticle />} redirect={PATH.adminLogin} />}
      />
      <Route
        path={PATH.adminArticleDrafts}
        element={
          <RouteAuthGuard component={<AdminDraftIndexArticle />} redirect={PATH.adminLogin} />
        }
      />
      <Route
        path={PATH.adminTag}
        element={<RouteAuthGuard component={<AdminIndexTag />} redirect={PATH.adminLogin} />}
      />
      {/* ******** User ******** */}
      <Route path="/" element={<Home />} />
      <Route path="/article/:articleId" element={<Article />} />
      <Route path="/notfound" element={<NotFound />} />
    </Routes>
  )
}
