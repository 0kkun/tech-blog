import { FC } from 'react'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { CreateArticle } from '../../features/admin/article/components/CreateArticle'

// 記事作成画面
export const AdminCreateArticle: FC = () => {
  return (
    <>
      <AdminTemplate title="管理画面">
        <CreateArticle />
      </AdminTemplate>
    </>
  )
}
