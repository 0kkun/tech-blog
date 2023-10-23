import React from 'react'
import { Modal, Box, Typography, Input, Button } from '@mui/material'
import { Tag } from '../types/tag'
import { Padding } from '@mui/icons-material'


interface Props {
  isOpen: boolean
  handleClose: any
  tag: Tag
}

export const EditTagModal: React.FC<Props> = ( { isOpen, handleClose, tag }) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
          <Box id="modal-modal-title" component="h2">
            id: {tag.id}
          </Box>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Input value={tag.name} name='tag' />
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ marginLeft: 3 }}
            >
              追加
            </Button>
          </Box>
          
        </Box>
      </Modal>
    </>
  )
}