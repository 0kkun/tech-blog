import { FC } from 'react'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { EditArticleView } from '../../features/admin/article/components/EditArticleView'

// 記事作成画面
export const AdminEditArticle: FC = () => {
  return (
    <>
      <AdminTemplate title="管理画面">
        <EditArticleView />
      </AdminTemplate>
    </>
  )
}
