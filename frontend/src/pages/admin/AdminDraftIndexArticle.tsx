import { FC } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { DraftArticleTable } from '../../features/admin/draft_articles/components/DraftArticleTable'

// 下書一覧画面
export const AdminDraftIndexArticle: FC = () => {
  const createData = (id: number, date: string, title: string) => {
    return { id, date, title }
  }
  const draftArticles = [
    createData(0, '2023/7/1', 'Laravel学習'),
    createData(1, '2023/7/1', 'Laravel学習'),
    createData(2, '2023/7/1', 'Laravel学習'),
    createData(3, '2023/7/1', 'Laravel学習'),
    createData(4, '2023/7/1', 'Laravel学習'),
  ]
  return (
    <>
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <DraftArticleTable draftArticles={draftArticles} />
            </Paper>
          </Grid>
        </Grid>
      </AdminTemplate>
    </>
  )
}
