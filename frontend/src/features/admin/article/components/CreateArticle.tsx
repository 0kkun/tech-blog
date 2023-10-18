import * as React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextareaAutosize from '@mui/material/TextareaAutosize'

import Title from '../../../../components/admin/elements/Title'


/**
 * Gridについて
 * xs : 横幅の指定。合計12になるように比率を指定する
 * 
 */

export const CreateArticle: React.FC = () => {
  return (
    <>
        <Grid container spacing={3}>
          {/* 新規投稿入力画面 */}
          <Grid item xs={6} md={3} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 500,
              }}
            >
              <Title>新規記事入力</Title>
              <TextareaAutosize
                aria-label="empty textarea"
                minRows={30}
                placeholder="Enter your text here"
              />
            </Paper>
          </Grid>
          {/* プレビュー画面 */}
          <Grid item xs={6} md={3} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 500,
              }}
            >
              <Title>プレビュー画面</Title>
            </Paper>
          </Grid>
          {/* Recent Articles */}
          <Grid item xs={12}>
            <Button variant="contained" color="success" size="medium">
              投稿
            </Button>
          </Grid>
        </Grid>
      
    </>
  )
}