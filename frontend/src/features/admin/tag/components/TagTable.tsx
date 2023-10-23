import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { useFetchTags } from '../hooks/useFetchTags'
import { EditTagModal } from './EditTagModal'
import { useEditTagModal } from '../hooks/useEditTagModal'
import { usePutTag } from '../hooks/usePutTag'
import { Tag } from '../types/tag'


export const TagTable: React.FC = () => {
  const fetchTagsHooks = useFetchTags()
  const editTagModalHooks = useEditTagModal()
  const putTagHooks = usePutTag()

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

  const handleTagOpen = (tag: Tag) => {
    putTagHooks.setValue('name', tag.name)
    editTagModalHooks.handleOpen() 
  }

  const handleTagSubmit = async (tag: Tag) => {
    putTagHooks.putTag(tag.id)
    putTagHooks.reset()
    handleClose()
    await fetchTagsHooks.fetchTags()
  }

  return (
    <>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', paddingBottom: 3 }}>
        <Title>投稿記事一覧</Title>
        <Button
          variant='contained'
          color='info'
          size="medium"
          sx={{ width: 100 }}
        >新規追加</Button>
      </Box>
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
                    handleTagOpen(tag)
                  }}
                >
                  編集
                </Button>
                <EditTagModal
                  isOpen={editTagModalHooks?.open ? editTagModalHooks.open : false}
                  handleClose={ () => { handleClose() }}
                  handleSubmit={ () => { handleTagSubmit(tag) }}
                  name='name'
                  control={putTagHooks.control}
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
