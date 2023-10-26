import { FC } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { ArticleTable } from '../../features/admin/article/components/ArticleTable'

// 記事一覧画面
export const AdminIndexArticle: FC = () => {
  return (
    <>
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
          {/* Recent Articles */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <ArticleTable title="投稿記事一覧" isDraft={false} />
            </Paper>
          </Grid>
        </Grid>
      </AdminTemplate>
    </>
  )
}
