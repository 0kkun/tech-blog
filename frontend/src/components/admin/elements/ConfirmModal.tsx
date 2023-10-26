import React from 'react'
import { Modal, Box, Button } from '@mui/material'
import Title from './Title'

export interface Props {
  isOpen: boolean
  title: string
  description: string
  handleClose: () => void
  handleSubmit: () => void
}

export const ConfirmModal: React.FC<Props> = ({
  isOpen,
  title,
  description,
  handleClose,
  handleSubmit,
}) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => {
          handleClose()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Title>{title}</Title>
          <Box>{description}</Box>
          <Box id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                handleClose()
              }}
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ marginLeft: 3 }}
              onClick={() => {
                handleSubmit()
              }}
            >
              実行
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
