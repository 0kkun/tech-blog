import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { Chart } from '../../features/admin/chart/components/Chart'
import { AccessCountBox } from '../../features/admin/access_counts/components/AccessCountBox'
import { ArticleTable } from '../../features/admin/article/components/ArticleTable'
import { useFetchArticles } from '../../features/admin/article/hooks/useFetchArticles'
import { useDeleteArticle } from '../../features/admin/article/hooks/useDeleteArticle'
import { Article } from '../../features/admin/article/types/article'
import { CustomizedSnackbar } from '../../components/admin/elements/CustomizedSnackbar'
import { ConfirmModal } from '../../components/admin/elements/ConfirmModal'

// NOTE: アクセス数の他に、記事の投稿数、タグごとの記事の本数のグラフがあってもいいかも
export const AdminHome: React.FC = () => {
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

  const accessCount = {
    totalAccessCount: 3024,
    updatedAt: '2023/7/1',
  }

  const createChartData = (date: string, count?: number) => {
    return { date, count }
  }

  const chartRecords = [
    createChartData('2023/7/1', 0),
    createChartData('2023/7/2', 300),
    createChartData('2023/7/3', 600),
    createChartData('2023/7/4', 800),
    createChartData('2023/7/5', 1500),
    createChartData('2023/7/6', 2000),
    createChartData('2023/7/7', 2400),
    createChartData('2023/7/8', 2400),
    createChartData('2023/7/9', undefined),
  ]

  // 記事一覧の削除ボタンが押下された時の処理
  const handleArticleDeleteButton = (article: Article) => {
    setSelectedArticle(article)
    setIsOpenConfirmModal(true)
  }

  // 記事削除モーダルの実行が押下された時の処理
  const executeDeleteArticle = async () => {
    if (selectedArticle) {
      await deleteArticleHooks.deleteArticle(selectedArticle.id)
      await fetchArticlesHooks.fetchArticles(true)
      setIsOpenSnackbar(true)
    } else {
      console.error('selectedArticle is undefined.')
    }
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
          <Chart chartRecords={chartRecords} />
          <AccessCountBox accessCount={accessCount} />
          <ArticleTable
            title="投稿済記事一覧"
            articles={fetchArticlesHooks.articles}
            handleDeleteButton={handleArticleDeleteButton}
          />
        </Grid>
      </AdminTemplate>
    </>
  )
}
