import * as React from 'react'
import {
  Button,
  Paper,
  Grid
} from '@mui/material'
import TextareaAutosize from '@mui/material/TextareaAutosize'

import Title from '../../../../components/admin/elements/Title'


/**
 * NOTE: Gridについて
 * xs : 横幅の指定。合計12になるように比率を指定する
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
                minHeight: 650,
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
                minHeight: 650,
              }}
            >
              <Title>プレビュー画面</Title>
            </Paper>
          </Grid>
          {/* Recent Articles */}
          <Grid item xs={12} justifyContent="end" spacing={1} container>
            <Grid item>
              <Button variant="contained" color="error" size="medium">
                クリア
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" size="medium">
                下書保存
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="success" size="medium">
                投稿
              </Button>
            </Grid>
          </Grid>
        </Grid>
      
    </>
  )
}