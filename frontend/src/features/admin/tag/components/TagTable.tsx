import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { useFetchTags } from '../hooks/useFetchTags'
import { Link as RouterLink } from 'react-router-dom'


export const TagTable: React.FC = () => {
  const fetchTagsHooks = useFetchTags()

  // 初回遷移時に表示するデータを取得する
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchTagsHooks.fetchTags()
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
            <TableCell>名前</TableCell>
            {/* <TableCell align="right">アクセス数</TableCell> */}
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchTagsHooks.tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>{tag.name}</TableCell>
              {/* <TableCell align="right">{`${article.count}`}</TableCell> */}
              <TableCell>
                <RouterLink to={`/admin/tag/edit/${tag.id}`}>
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
    </>
  )
}
