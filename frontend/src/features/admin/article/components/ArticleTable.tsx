import * as React from 'react'
import { Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { Article } from '../types/article'

const preventDefault = (event: React.MouseEvent) => {
  event.preventDefault()
}

export interface ArticlesProps {
  articles: Article[]
}

export const ArticleTable: React.FC<ArticlesProps> = ({ articles }) => {
  return (
    <>
      <Title>投稿記事一覧</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">アクセス数</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell>{article.date}</TableCell>
              <TableCell>{article.title}</TableCell>
              <TableCell align="right">{`${article.count}`}</TableCell>
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
