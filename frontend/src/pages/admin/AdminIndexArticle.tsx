import { FC } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { ArticleTable } from '../../features/admin/article/components/ArticleTable'

export const AdminIndexArticle: FC = () => {

  const createData = (id: number, date: string, title: string, count: number) => {
    return { id, date, title, count }
  }

  const articles = [
    createData(0, '2023/7/1', 'Laravel学習', 312),
    createData(1, '2023/7/1', 'Laravel学習', 866),
    createData(2, '2023/7/1', 'Laravel学習', 100),
    createData(3, '2023/7/1', 'Laravel学習', 654),
    createData(4, '2023/7/1', 'Laravel学習', 212),
  ]


  return (
    <>
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
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
