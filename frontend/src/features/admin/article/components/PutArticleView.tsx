import React, { useEffect, useState } from 'react'
import { Button, Paper, Grid, Box } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { usePutArticle } from '../hooks/usePutArticle'
import { MarkdownPreview } from './MarkdownPreview'
import { TagSelectBox } from './TagSelectBox'
import { BasicInputField } from '../../../../components/admin/elements/BasicInputField'
import { TextArea } from './TextArea'
import { useFetchTags } from '../../tag/hooks/useFetchTags'
import { CustomizedSnackbar } from '../../../../components/admin/elements/CustomizedSnackbar'
import { useParams } from 'react-router-dom'
import { useGetArticle } from '../hooks/useGetArticle'
import { useDeleteArticle } from '../hooks/useDeleteArticle'
import { BasicFileUploadButton } from '../../../../components/admin/elements/BasicFileUploadButton'
import { usePostUploadThumbnail } from '../hooks/usePostUploadThumbnail'
import { usePostUpload } from '../hooks/usePostUpload'

/**
 * NOTE: Gridについて
 * xs : 横幅の指定。合計12になるように比率を指定する
 *
 * NOTE: SyntaxHighlighterのstyleについて
 * https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
 */

interface Props {
  isEdit: boolean
}

export const PutArticleView: React.FC<Props> = ({ isEdit }) => {
  const putArticleHooks = usePutArticle()
  const fetchTagsHooks = useFetchTags()
  const getArticleHooks = useGetArticle()
  const deleteArticleHooks = useDeleteArticle()
  const postUploadThumbnailHooks = usePostUploadThumbnail()
  const postUploadHooks = usePostUpload()
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
  const [hasThumbnailImage, setHasThumbnail] = useState(false)
  // 入力したものをリアルタイムでプレビュー表示するためにwatch
  const inputText = putArticleHooks.watch('inputText')
  const pageTitle = isEdit ? '記事編集入力' : '新規記事入力'
  const deleteOrClearBottunText = isEdit ? '削除' : 'クリア'
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

      if (articleId && isEdit) {
        const article = await getArticleHooks.getArticle(Number(articleId))
        if (article) {
          putArticleHooks.setValue('inputText', article.content)
          putArticleHooks.setValue('selectedTags', article.tags)
          putArticleHooks.setValue('title', article.title)
          if (article.thumbnail_image) {
            setHasThumbnail(true)
          }
        }
      }
    }
    fetchInitialData()
  }, [])

  // 記事投稿時の処理
  const onSubmit = async (isPublished: boolean) => {
    if (articleId && isEdit) {
      // 更新
      await putArticleHooks.putArticles(isPublished, Number(articleId))
    } else {
      // 新規作成
      await putArticleHooks.putArticles(isPublished)
    }
    handleClear()
    handleSnackbarOpen()
  }

  // 入力した内容をクリアするときの処理
  const handleClear = () => {
    putArticleHooks.reset()
  }

  // 記事削除時の処理
  const handleDelete = async () => {
    // TODO: confirmモーダル出して、ダッシュボードに戻る
    if (isEdit && articleId) {
      await deleteArticleHooks.deleteArticle(Number(articleId))
      handleSnackbarOpen()
    }
  }

  // 処理成功時のトースト
  const handleSnackbarOpen = () => {
    setIsOpenSnackbar(true)
  }

  const handleSnackbarClose = () => {
    setIsOpenSnackbar(false)
  }

  // サムネイル画像のアップロード処理
  const handleThumbnailUpload = async (formData: FormData) => {
    const image = await postUploadThumbnailHooks.postUploadThumbnail(formData)
    if (image) {
      putArticleHooks.setValue('thumbnail_image', image)
      setHasThumbnail(true)
      handleSnackbarOpen()
    } else {
      console.error('Upload Thumbnail Failed.')
    }
  }

  // 挿入画像のアップロード処理
  const handleImageUpload = async (formData: FormData) => {
    const image = await postUploadHooks.postUpload(formData)
    if (image) {
      // マークダウン形式で画像を追加
      const updatedInputText = inputText + `\n![Image](${image.url})`
      // テキストエリアに更新されたテキストをセット
      putArticleHooks.setValue('inputText', updatedInputText)

      const updatedImages = putArticleHooks.getValues('images')
      if (updatedImages === undefined) {
        // 1個目のファイルの処理
        putArticleHooks.setValue('images', [image])
      } else {
        // 2個目以降のファイルの処理
        updatedImages.push(image)
        putArticleHooks.setValue('images', updatedImages)
      }
      handleSnackbarOpen()
    }
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
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TagSelectBox
              label="タグ選択"
              name="selectedTags"
              tags={fetchTagsHooks.tags}
              control={putArticleHooks.control}
            />
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ marginLeft: 2, marginTop: 3 }}>
              <BasicFileUploadButton
                title='サムネイル画像'
                name='file'
                color='secondary'
                handleFileUpload={handleThumbnailUpload}
              />
            </Box>
            <Box sx={{ textAlign: 'center'}}>
              {hasThumbnailImage
                ? "サムネイル登録済み"
                : "サムネイル未設定"
              }
            </Box>
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
                    if (isEdit) {
                      handleDelete()
                    } else {
                      handleClear()
                    }
                  }}
                >
                  {deleteOrClearBottunText}
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

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper sx={paperStyle}>
              <Title>{pageTitle}</Title>
              <Box sx={{ marginBottom: 2, display: 'flex' }}>
                <BasicInputField
                  name="title"
                  placeholder="タイトルを入力"
                  control={putArticleHooks.control}
                />
                <Box sx={{ width: '160px', textAlign: 'center' }}>
                  <BasicFileUploadButton
                    title='画像挿入'
                    name='file'
                    color='info'
                    handleFileUpload={handleImageUpload}
                  />
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
          <Grid item xs={6}>
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
