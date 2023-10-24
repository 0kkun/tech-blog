import { FC } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { DraftArticleTable } from '../../features/admin/draft_articles/components/DraftArticleTable'

// 下書一覧画面
export const AdminDraftIndexArticle: FC = () => {
  return (
    <>
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <DraftArticleTable />
            </Paper>
          </Grid>
        </Grid>
      </AdminTemplate>
    </>
  )
}
