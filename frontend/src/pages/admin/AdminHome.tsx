import { FC } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { Chart } from '../../features/admin/chart/components/Chart'
import { AccessCountBox } from '../../features/admin/access_counts/components/AccessCountBox'
import { ArticleTable } from '../../features/admin/article/components/ArticleTable'

export const AdminHome: FC = () => {
  const accessCount = {
    totalAccessCount: 3024,
    updatedAt: '2023/7/1',
  }

  const createArticleData = (id: number, date: string, title: string, count: number) => {
    return { id, date, title, count }
  }

  const articles = [
    createArticleData(0, '2023/7/1', 'Laravel学習', 312),
    createArticleData(1, '2023/7/1', 'Laravel学習', 866),
    createArticleData(2, '2023/7/1', 'Laravel学習', 100),
    createArticleData(3, '2023/7/1', 'Laravel学習', 654),
    createArticleData(4, '2023/7/1', 'Laravel学習', 212),
  ]

  const createChartData = (date: string, count?: number) => {
    return { date, count }
  }

  const chartRecords = [
    createChartData('2023/7/1', 0),
    createChartData('2023/7/2', 300),
    createChartData('2023/7/3', 600),
    createChartData('2023/7/4', 800),
    createChartData('2023/7/5', 1500),
    createChartData('2023/7/6', 2000),
    createChartData('2023/7/7', 2400),
    createChartData('2023/7/8', 2400),
    createChartData('2023/7/9', undefined),
  ]

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
              <Chart chartRecords={chartRecords} />
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
              <AccessCountBox accessCount={accessCount} />
            </Paper>
          </Grid>
          {/* Recent Articles */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <ArticleTable articles={articles} />
            </Paper>
          </Grid>
        </Grid>
      </AdminTemplate>
    </>
  )
}
