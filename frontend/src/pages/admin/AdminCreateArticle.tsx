import { FC } from 'react'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { CreateArticle } from '../../features/admin/article/components/CreateArticle'

export const AdminCreateArticle: FC = () => {
  return (
    <>
      <AdminTemplate title="管理画面">
        <CreateArticle />
      </AdminTemplate>
    </>
  )
}
