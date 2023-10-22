import React, { useEffect } from 'react'
import { Link, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { Article } from '../types/article'
import { useFetchArticles } from '../hooks/useFetchArticles'
import { formatDateTime } from '../../../../libs/date'
import { Link as RouterLink } from 'react-router-dom'

const preventDefault = (event: React.MouseEvent) => {
  event.preventDefault()
}


export const ArticleTable: React.FC = () => {
  const fetchArticlesHooks = useFetchArticles()

  // 初回遷移時に表示するデータを取得する
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchArticlesHooks.fetchArticles()
        // setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchInitialData()
  }, [])

  return (
    <>
      <Title>投稿記事一覧</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>作成日</TableCell>
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
                <Button variant="contained" color="error" size="small">
                  削除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more articles
      </Link>
    </>
  )
}
