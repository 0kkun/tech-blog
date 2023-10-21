import { FC } from 'react'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { CreateArticleView } from '../../features/admin/article/components/CreateArticleView'

// 記事作成画面
export const AdminCreateArticle: FC = () => {
  return (
    <>
      <AdminTemplate title="管理画面">
        <CreateArticleView />
      </AdminTemplate>
    </>
  )
}
