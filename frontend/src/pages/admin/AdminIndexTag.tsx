import { FC } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { TagTable } from '../../features/admin/tag/components/TagTable'

// タグ一覧画面
export const AdminIndexTag: FC = () => {
  return (
    <>
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
          {/* Recent Articles */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <TagTable />
            </Paper>
          </Grid>
        </Grid>
      </AdminTemplate>
    </>
  )
}
