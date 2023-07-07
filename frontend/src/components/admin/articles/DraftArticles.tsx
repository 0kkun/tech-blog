import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from '../templates/Title'

// Generate Order Data
const createData = (id: number, date: string, title: string, count: number) => {
  return { id, date, title, count }
}

const rows = [
  createData(0, '2023/7/1', 'Laravel学習', 312),
  createData(1, '2023/7/1', 'Laravel学習', 866),
  createData(2, '2023/7/1', 'Laravel学習', 100),
  createData(3, '2023/7/1', 'Laravel学習', 654),
  createData(4, '2023/7/1', 'Laravel学習', 212),
]

const preventDefault = (event: React.MouseEvent) => {
  event.preventDefault()
}

export const DraftArticles = () => {
  return (
    <React.Fragment>
      <Title>下書記事一覧</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">アクセス数</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell align="right">{`${row.count}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more articles
      </Link>
    </React.Fragment>
  )
}
