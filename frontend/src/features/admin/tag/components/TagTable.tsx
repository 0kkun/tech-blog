import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { useFetchTags } from '../hooks/useFetchTags'
import { EditTagModal } from './EditTagModal'
import { useEditTagModal } from '../hooks/useEditTagModal'


export const TagTable: React.FC = () => {
  const fetchTagsHooks = useFetchTags()
  const editTagModalHooks = useEditTagModal()

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

  const handleClose = () => {
    editTagModalHooks.handleClose()
  }

  return (
    <>

      <Title>投稿記事一覧</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>名前</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchTagsHooks.tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>{tag.name}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={ () => {
                    editTagModalHooks.handleOpen() 
                  }}
                >
                  編集
                </Button>
                <EditTagModal
                  isOpen={editTagModalHooks?.open ? editTagModalHooks.open : false}
                  handleClose={ () => {handleClose() }}
                  tag={tag}
                />
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
