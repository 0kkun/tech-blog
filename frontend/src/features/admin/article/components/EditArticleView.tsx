import React, { useEffect, useState } from 'react'
import { Button, Paper, Grid, Box } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { usePutArticle } from '../hooks/usePutArticle'
import { MarkdownPreview } from './MarkdownPreview'
import { TagSelectBox } from './TagSelectBox'
import { BasicInputField } from '../../../../components/admin/elements/BasicInputField'
import { TextArea } from './TextArea'
import { useParams } from 'react-router-dom'
import { useGetArticle } from '../hooks/useGetArticle'
import { CustomizedSnackbar } from '../../../../components/admin/elements/CustomizedSnackbar'
import { FileUploadUI } from './FileUploadUI'
import { ImageData } from '../types/image'
import { useFetchTags } from '../../tag/hooks/useFetchTags'


export const EditArticleView: React.FC = () => {
  const putArticleHooks = usePutArticle()
  const getArticleHooks = useGetArticle()
  const fetchTagsHooks = useFetchTags()
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
  // 入力したものをリアルタイムでプレビュー表示するためにwatch
  const inputText = putArticleHooks.watch('inputText')
  // パスパラメータからarticleIdを取得
  const { articleId } = useParams<{ articleId: string }>()
  const paperStyle = {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 650,
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchTagsHooks.fetchTags()
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


  const onSubmit = async (isPublished: boolean) => {
    if (articleId) {
      await putArticleHooks.putArticles(isPublished, Number(articleId))
      handleSnackbarOpen()
    }
  }

  const handleClear = () => {
    putArticleHooks.reset()
  }

  const handleUpSuccess = (image: ImageData) => {
    // マークダウン形式で画像を追加
    const updatedInputText = inputText + `\n![Image](${image.url})`
    // テキストエリアに更新されたテキストをセット
    putArticleHooks.setValue('inputText', updatedInputText)

    const updatedImages = putArticleHooks.getValues('images')
    if (updatedImages === undefined) {
      // 1個目のファイルの処理
      putArticleHooks.setValue('images', [image])
      handleSnackbarOpen()
    } else {
      // 2個目以降のファイルの処理
      updatedImages.push(image)
      putArticleHooks.setValue('images', updatedImages)
      handleSnackbarOpen()
    }
  }

  const handleSnackbarOpen = () => {
    setIsOpenSnackbar(true)
  }

  const handleSnackbarClose = () => {
    setIsOpenSnackbar(false)
  }

  return (
    <>
      <CustomizedSnackbar
        isOpen={isOpenSnackbar}
        handleClose={() => {
          handleSnackbarClose()
        }}
        message="Success!"
      />
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
                <Box sx={{ textAlign: 'right' }}>
                  <FileUploadUI handleUpSuccess={handleUpSuccess} />
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
