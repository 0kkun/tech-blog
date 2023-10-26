import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  TableContainer,
} from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { useFetchTags } from '../hooks/useFetchTags'
import { EditTagModal } from './EditTagModal'
import { CreateTagModal } from './CreateTagModal'
import { usePutTag } from '../hooks/usePutTag'
import { Tag } from '../types/tag'
import { TABLE_MAX_HEIGHT } from '../../../../config/viewConstant'
import { ConfirmModal } from '../../../../components/admin/elements/ConfirmModal'
import { useDeleteTag } from '../hooks/useDeleteTag'


export const TagTable: React.FC = () => {
  const fetchTagsHooks = useFetchTags()
  const putTagHooks = usePutTag()

  const [editTagModalOpen, setEditTagModalOpen] = useState(false)
  const [createTagModalOpen, setCreateTagModalOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag>()
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const deleteTagHooks = useDeleteTag()

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

  const handleEditTagModalClose = () => {
    setEditTagModalOpen(false)
  }

  const handleEditTagOpen = (tag: Tag) => {
    putTagHooks.setValue('name', tag.name)
    setSelectedTag(tag)
    setEditTagModalOpen(true)
  }

  const handleEditTagSubmit = async (tag: Tag) => {
    putTagHooks.putTag(tag.id)
    putTagHooks.reset()
    handleEditTagModalClose()
    await fetchTagsHooks.fetchTags()
  }

  const handleCreateTagModalClose = () => {
    putTagHooks.reset()
    setCreateTagModalOpen(false)
  }

  const handleCreateTagOpen = () => {
    putTagHooks.reset()
    setCreateTagModalOpen(true)
  }

  const handleCreateTagSubmit = async () => {
    putTagHooks.putTag()
    putTagHooks.reset()
    setCreateTagModalOpen(false)
    fetchTagsHooks.fetchTags()
  }

  const handleConfirmModalOpen = (tag: Tag) => {
    setSelectedTag(tag)
    setIsOpenConfirmModal(true)
  }

  const handleConfirmModalClose = () => {
    setIsOpenConfirmModal(false)
  }

  const handleConfirmSubmit = async () => {
    if (selectedTag) {
      await deleteTagHooks.deleteTag(selectedTag.id)
      await fetchTagsHooks.fetchTags()
    } else {
      console.error('selectedTag is undefined.')
    }
    handleConfirmModalClose()
  }

  return (
    <>
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        title='削除確認'
        description='タグを1件削除します。よろしいですか？'
        handleClose={ () => { handleConfirmModalClose() } }
        handleSubmit={ () => { handleConfirmSubmit() } }
      />
      <CreateTagModal
        isOpen={createTagModalOpen}
        handleClose={() => {
          handleCreateTagModalClose()
        }}
        handleSubmit={() => {
          handleCreateTagSubmit()
        }}
        name="name"
        control={putTagHooks.control}
      />
      <EditTagModal
        isOpen={editTagModalOpen}
        handleClose={() => {
          handleEditTagModalClose()
        }}
        handleSubmit={() => {
          if (selectedTag) {
            handleEditTagSubmit(selectedTag)
          }
        }}
        name="name"
        control={putTagHooks.control}
      />
      <Box
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', paddingBottom: 3 }}
      >
        <Title>タグ一覧</Title>
        <Button
          variant="contained"
          color="info"
          size="medium"
          sx={{ width: 100 }}
          onClick={() => {
            handleCreateTagOpen()
          }}
        >
          新規追加
        </Button>
      </Box>
      <TableContainer style={{ maxHeight: TABLE_MAX_HEIGHT }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow style={{ backgroundColor: '#0000', height: '35px' }}>
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
                    onClick={() => {
                      handleEditTagOpen(tag)
                    }}
                  >
                    編集
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={ () => { handleConfirmModalOpen(tag) }}
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
