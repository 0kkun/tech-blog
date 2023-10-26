import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
} from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { useFetchArticles } from '../hooks/useFetchArticles'
import { formatDateTime } from '../../../../libs/date'
import { Link as RouterLink } from 'react-router-dom'
import { TABLE_MAX_HEIGHT } from '../../../../config/viewConstant'
import { useDeleteArticle } from '../hooks/useDeleteArticle'
import { ConfirmModal } from '../../../../components/admin/elements/ConfirmModal'
import { Article } from '../types/article'
import { CustomizedSnackbar } from '../../../../components/admin/elements/CustomizedSnackbar'

interface Props {
  title: string
  isDraft: boolean
}

export const ArticleTable: React.FC<Props> = ({ title, isDraft }) => {
  const fetchArticlesHooks = useFetchArticles()
  const deleteArticleHooks = useDeleteArticle()
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article>()
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)

  // 初回遷移時に表示するデータを取得する
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (isDraft) {
          await fetchArticlesHooks.fetchArticles(false)
        } else {
          await fetchArticlesHooks.fetchArticles(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchInitialData()
  }, [])

  const handleConfirmModalOpen = (article: Article) => {
    setSelectedArticle(article)
    setIsOpenConfirmModal(true)
  }

  const handleConfirmModalClose = () => {
    setIsOpenConfirmModal(false)
  }

  const handleConfirmSubmit = async () => {
    if (selectedArticle) {
      await deleteArticleHooks.deleteArticle(selectedArticle.id)
      await fetchArticlesHooks.fetchArticles(true)
      handleSnackbarOpen()
    } else {
      console.error('selectedArticle is undefined.')
    }
    handleConfirmModalClose()
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
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        title="削除確認"
        description="記事を1件削除します。よろしいですか？"
        handleClose={() => {
          handleConfirmModalClose()
        }}
        handleSubmit={() => {
          handleConfirmSubmit()
        }}
      />
      <Title>{title}</Title>
      <TableContainer style={{ maxHeight: TABLE_MAX_HEIGHT }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>作成日時</TableCell>
              <TableCell>タイトル</TableCell>
              {/* <TableCell align="right">アクセス数</TableCell> */}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchArticlesHooks.articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{formatDateTime(article.created_at)}</TableCell>
                <TableCell>{article.title}</TableCell>
                {/* <TableCell align="right">{`${article.count}`}</TableCell> */}
                <TableCell>
                  <RouterLink to={`/admin/article/edit/${article.id}`}>
                    <Button variant="contained" color="success" size="small">
                      編集
                    </Button>
                  </RouterLink>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                      handleConfirmModalOpen(article)
                    }}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
