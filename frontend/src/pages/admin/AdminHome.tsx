import { FC } from 'react'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { Chart } from '../../components/admin/templates/Chart'
import { AccessCount } from '../../components/admin/templates/AccessCount'
import { Articles } from '../../components/admin/articles/Articles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

export const AdminHome: FC = () => {
  return (
    <>
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Access Count */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <AccessCount />
            </Paper>
          </Grid>
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
