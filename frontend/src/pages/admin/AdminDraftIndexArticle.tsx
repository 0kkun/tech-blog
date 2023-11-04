import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { ArticleTable } from '../../features/admin/article/components/ArticleTable'
import { useFetchArticles } from '../../features/admin/article/hooks/useFetchArticles'
import { useDeleteArticle } from '../../features/admin/article/hooks/useDeleteArticle'
import { Article } from '../../features/admin/article/types/article'
import { CustomizedSnackbar } from '../../components/admin/elements/CustomizedSnackbar'
import { ConfirmModal } from '../../components/admin/elements/ConfirmModal'

// 下書一覧画面
export const AdminDraftIndexArticle: React.FC = () => {
  const fetchArticlesHooks = useFetchArticles()
  const deleteArticleHooks = useDeleteArticle()
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article>()
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)

  // 初回遷移時に表示するデータを取得する
  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchArticlesHooks.fetchArticles(true)
    }
    fetchInitialData()
  }, [])

  const executeDeleteArticle = async () => {
    console.log('delete')
    setIsOpenConfirmModal(false)
  }

  return (
    <>
      <CustomizedSnackbar
        isOpen={isOpenSnackbar}
        handleClose={() => {
          setIsOpenSnackbar(false)
        }}
        message="Success!"
      />
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        title="削除確認"
        description="記事を1件削除します。よろしいですか？"
        handleClose={() => {
          setIsOpenConfirmModal(false)
        }}
        handleSubmit={() => {
          executeDeleteArticle()
        }}
      />
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
          <ArticleTable
            title="下書一覧"
            isDraft={true}
          />
        </Grid>
      </AdminTemplate>
    </>
  )
}
