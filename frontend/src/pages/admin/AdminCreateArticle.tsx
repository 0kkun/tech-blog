import { FC } from 'react'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { PutArticleView } from '../../features/admin/article/components/PutArticleView'

// 記事作成画面
export const AdminCreateArticle: FC = () => {
  return (
    <>
      <AdminTemplate title="管理画面">
        <PutArticleView isEdit={false} />
      </AdminTemplate>
    </>
  )
}
