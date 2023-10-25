import React, { useEffect } from 'react'
import { Button, Paper, Grid, Box } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { usePutArticle } from '../hooks/usePutArticle'
import { MarkdownPreview } from './MarkdownPreview'
import { TagSelectBox } from './TagSelectBox'
import { BasicInputField } from '../../../../components/admin/elements/BasicInputField'
import { TextArea } from './TextArea'
import { useParams } from 'react-router-dom'
import { useGetArticle } from '../hooks/useGetArticle'

export const EditArticleView: React.FC = () => {
  const putArticleHooks = usePutArticle()
  const getArticleHooks = useGetArticle()

  // 入力したものをリアルタイムでプレビュー表示するためにwatch
  const inputText = putArticleHooks.watch('inputText')

  // パスパラメータからarticleIdを取得
  const { articleId } = useParams<{ articleId: string }>()

  // 初回遷移時に表示するデータを取得する
  useEffect(() => {
    const fetchInitialData = async () => {
      if (articleId) {
        const article = await getArticleHooks.getArticle(Number(articleId))
        if (article) {
          putArticleHooks.setValue('inputText', article.content)
          putArticleHooks.setValue('selectedTags', article.tags)
          putArticleHooks.setValue('title', article.title)
        }
      }
    }
    fetchInitialData()
  }, [])

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

  const onSubmit = async (isPublished: boolean) => {
    if (articleId) {
      await putArticleHooks.putArticles(isPublished, Number(articleId))
    }
  }

  const handleClear = () => {
    putArticleHooks.reset()
  }

  return (
    <>
      <form>
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
                variant="contained"
                color="success"
                size="medium"
                onClick={() => {
                  onSubmit(true)
                }}
              >
                投稿
              </Button>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ marginTop: 1 }}>
                  <Button
                    sx={{ width: '100%' }}
                    variant="contained"
                    color="error"
                    size="medium"
                    onClick={() => {
                      handleClear()
                    }}
                  >
                    削除
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{ marginTop: 1 }}>
                  <Button
                    sx={{ width: '100%' }}
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={() => {
                      onSubmit(false)
                    }}
                  >
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
              <Title>記事編集入力</Title>
              <Box sx={{ marginBottom: 2, display: 'flex' }}>
                <BasicInputField
                  name="title"
                  placeholder="タイトルを入力"
                  control={putArticleHooks.control}
                />
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
