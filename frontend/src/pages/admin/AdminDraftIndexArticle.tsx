import { FC } from 'react'
import Grid from '@mui/material/Grid'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { ArticleTable } from '../../features/admin/article/components/ArticleTable'

// 下書一覧画面
export const AdminDraftIndexArticle: FC = () => {
  return (
    <>
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
          <ArticleTable
            title="下書一覧"
            isDraft={true}
          />
        </Grid>
      </AdminTemplate>
    </>
  )
}
