import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'

import Title from '../../../../components/admin/elements/Title'
import { DraftArticle } from '../types/draftArticle'

export interface DraftArticlesProps {
  draftArticles: DraftArticle[],
}

export const DraftArticleTable: React.FC<DraftArticlesProps> = ({ draftArticles }) => {
  return (
    <>
      <Title>下書記事一覧</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {draftArticles.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>
                <Button variant="contained" color="success" size="small">
                  編集
                </Button>
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
    </>
  )
}
