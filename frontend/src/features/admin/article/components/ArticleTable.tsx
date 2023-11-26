import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Paper,
  Grid,
} from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { formatDateTime } from '../../../../libs/date'
import { Link as RouterLink } from 'react-router-dom'
import { TABLE_MAX_HEIGHT } from '../../../../config/viewConstant'
import { Article } from '../types/article'

interface Props {
  title: string
  articles: Article[]
  handleDeleteButton: (article: Article) => void
}

export const ArticleTable: React.FC<Props> = ({ title, articles, handleDeleteButton }) => {
  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>{title}</Title>
          <TableContainer style={{ maxHeight: TABLE_MAX_HEIGHT }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>作成日時</TableCell>
                  <TableCell>更新日時</TableCell>
                  <TableCell>タイトル</TableCell>
                  <TableCell>アクセス数</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>{formatDateTime(article.created_at)}</TableCell>
                    <TableCell>{formatDateTime(article.updated_at)}</TableCell>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>{article.access_count}</TableCell>
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
                          handleDeleteButton(article)
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
        </Paper>
      </Grid>
    </>
  )
}
