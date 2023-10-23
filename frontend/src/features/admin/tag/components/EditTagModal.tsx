import React, { useEffect } from 'react'
import { Modal, Box, Input, Button } from '@mui/material'
import { Tag } from '../types/tag'
import Title from '../../../../components/admin/elements/Title'
import { usePutTag } from '../hooks/usePutTag'
import { Control, Controller, FieldValue, FieldValues } from 'react-hook-form'

interface Props {
  isOpen: boolean
  handleClose: () => void
  handleSubmit: () => void
  name: string
  control: Control<FieldValues, any>
}

export const EditTagModal: React.FC<Props> = ( { isOpen, handleClose, handleSubmit, name, control }) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  // const putTagHooks = usePutTag()

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Title>タグ編集</Title>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Input {...field} />
              )}
            />
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ marginLeft: 3 }}
              onClick={ () => { handleClose() }}
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ marginLeft: 3 }}
              onClick={ () => { handleSubmit() }}
            >
              完了
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}