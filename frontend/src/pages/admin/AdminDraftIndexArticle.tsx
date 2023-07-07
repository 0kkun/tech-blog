import { FC } from 'react'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { DraftArticles } from '../../components/admin/articles/DraftArticles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

export const AdminDraftIndexArticle: FC = () => {
  return (
    <>
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <DraftArticles />
            </Paper>
          </Grid>
        </Grid>
      </AdminTemplate>
    </>
  )
}
