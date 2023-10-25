import React, { useEffect } from 'react'
import { Button, Paper, Grid, Box } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { usePutArticle } from '../hooks/usePutArticle'
import { MarkdownPreview } from './MarkdownPreview'
import { TagSelectBox } from './TagSelectBox'
import { BasicInputField } from '../../../../components/admin/elements/BasicInputField'
import { TextArea } from './TextArea'
import { useFetchTags } from '../../tag/hooks/useFetchTags'
import { FileUploadUI } from './FileUploadUI'
import { PostUploadResponse } from '../types/upload'

/**
 * NOTE: Gridについて
 * xs : 横幅の指定。合計12になるように比率を指定する
 *
 * NOTE: SyntaxHighlighterのstyleについて
 * https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
 */
export const CreateArticleView: React.FC = () => {
  const putArticleHooks = usePutArticle()
  const fetchTagsHooks = useFetchTags()

  // 入力したものをリアルタイムでプレビュー表示するためにwatch
  const inputText = putArticleHooks.watch('inputText')

  const paperStyle = {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 650,
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchTagsHooks.fetchTags()
      } catch (error) {
        console.log(error)
      }
    }
    fetchInitialData()
  }, [])

  const onSubmit = async (isPublished: boolean) => {
    await putArticleHooks.putArticles(isPublished)
  }

  const handleClear = () => {
    putArticleHooks.reset()
  }

  const handleUpSuccess = (image: PostUploadResponse) => {
    // マークダウン形式で画像を追加
    const updatedInputText = inputText + `\n![Image](${image.url})`
    // テキストエリアに更新されたテキストをセット
    putArticleHooks.setValue('inputText', updatedInputText)
    
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
                tags={fetchTagsHooks.tags}
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
                    クリア
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
              <Title>新規記事入力</Title>
              <Box sx={{ marginBottom: 2, display: 'flex' }}>
                <BasicInputField
                  name="title"
                  placeholder="タイトルを入力"
                  control={putArticleHooks.control}
                />
                <Box sx={{ textAlign: 'right' }}>
                  <FileUploadUI handleUpSuccess={handleUpSuccess}/>
                </Box>
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
