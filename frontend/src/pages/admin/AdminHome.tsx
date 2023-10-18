import { FC } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { Chart } from '../../features/admin/chart/components/Chart'
import { AccessCountBox } from '../../features/admin/access_counts/components/AccessCountBox'
import { Articles } from '../../features/admin/articles/components/Articles'

export const AdminHome: FC = () => {
  const accessCount = {
    totalAccessCount: 3024,
    updatedAt: '2023/7/1',
  }
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
              <AccessCountBox accessCount={accessCount}/>
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
