import React from 'react'
import { Button, Paper, Grid, Box } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { usePutArticle } from '../hooks/usePutArticle'
import { MarkdownPreview } from './MarkdownPreview'
import { TagSelectBox } from './TagSelectBox'
import { CheckBoxField } from '../../../../components/admin/elements/CheckBoxField'
import { BasicInputField } from '../../../../components/admin/elements/BasicInputField'
import { TextArea } from './TextArea'

/**
 * NOTE: Gridについて
 * xs : 横幅の指定。合計12になるように比率を指定する
 *
 * NOTE: SyntaxHighlighterのstyleについて
 * https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
 */
export const CreateArticleView: React.FC = () => {
  const putArticleHooks = usePutArticle()

  // 入力したものをリアルタイムでプレビュー表示するためにwatch
  const inputText = putArticleHooks.watch('inputText')

  const paperStyle = {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 650,
  }
  const tags = [
    { id: 1, name: 'Laravel' },
    { id: 2, name: 'PHP' },
    { id: 3, name: 'Typescript' },
  ]

  const onSubmit = async () => {
    // const data = putArticleHooks.getValues()
    await putArticleHooks.putArticles()
    // console.log(data)
  }

  return (
    <>
      <form onSubmit={putArticleHooks.handleSubmit(onSubmit)}>
        <Grid container>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <TagSelectBox
                label="タグ選択"
                name="selectedTags"
                tags={tags}
                control={putArticleHooks.control}
              />
            </Grid>
            <Grid item xs={4} sx={{ marginTop: 1 }}>
              <Button
                sx={{ display: 'block', margin: '0 auto', width: '100%' }}
                type="submit"
                variant="contained"
                color="success"
                size="medium"
              >
                投稿
              </Button>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ marginTop: 1 }}>
                  <Button sx={{ width: '100%' }} variant="contained" color="error" size="medium">
                    クリア
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 1 }}>
                  <Button sx={{ width: '100%' }} variant="contained" color="primary" size="medium">
                    下書保存
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6} md={3} lg={6}>
            <Paper sx={paperStyle}>
              <Title>新規記事入力</Title>
              <Box sx={{ marginBottom: 2, display: 'flex' }}>
                <BasicInputField
                  name="title"
                  placeholder="タイトルを入力"
                  control={putArticleHooks.control}
                />
                <CheckBoxField label="公開" name="isPublished" control={putArticleHooks.control} />
              </Box>
              <TextArea
                name="inputText"
                placeholder="本文をマークダウン形式で入力"
                minRows={25}
                control={putArticleHooks.control}
              />
            </Paper>
          </Grid>
          <Grid item xs={6} md={3} lg={6}>
            <Paper sx={paperStyle}>
              <Title>プレビュー画面</Title>
              <MarkdownPreview inputText={inputText} />
            </Paper>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
