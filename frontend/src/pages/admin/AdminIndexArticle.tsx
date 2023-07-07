import { FC } from 'react'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { Articles } from '../../components/admin/articles/Articles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

export const AdminIndexArticle: FC = () => {
  return (
    <>
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
          {/* Recent Articles */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Articles />
            </Paper>
          </Grid>
        </Grid>
      </AdminTemplate>
    </>
  )
}
