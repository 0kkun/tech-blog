import React from 'react'
import { Modal, Box, Input, Button } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { Control, Controller, FieldValues } from 'react-hook-form'

interface Props {
  isOpen: boolean
  handleClose: () => void
  handleSubmit: () => void
  name: string
  control: Control<FieldValues, any>
}

export const CreateTagModal: React.FC<Props> = ( { isOpen, handleClose, handleSubmit, name, control }) => {
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

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Title>タグ新規追加</Title>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Controller
              name={name}
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <Input {...field} autoComplete='on'/>
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
              追加
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}