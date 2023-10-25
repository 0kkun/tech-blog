import React, { useEffect } from 'react'
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
import { useFetchArticles } from '../../article/hooks/useFetchArticles'
import { formatDateTime } from '../../../../libs/date'
import { TABLE_MAX_HEIGHT } from '../../../../config/viewConstant'
import { Link as RouterLink } from 'react-router-dom'


export const DraftArticleTable: React.FC = () => {
  const fetchArticlesHooks = useFetchArticles()

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchArticlesHooks.fetchArticles(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchInitialData()
  }, [])

  return (
    <>
      <Title>下書記事一覧</Title>
      <TableContainer style={{ maxHeight: TABLE_MAX_HEIGHT }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>作成日時</TableCell>
              <TableCell>タイトル</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchArticlesHooks.articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{formatDateTime(article.created_at)}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>
                  <RouterLink to={`/admin/article/edit/${article.id}`}>
                    <Button variant="contained" color="success" size="small">
                      編集
                    </Button>
                  </RouterLink>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" size="small">
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
