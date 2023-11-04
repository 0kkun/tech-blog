import React from 'react'
import { Modal, Box, Button } from '@mui/material'
import Title from './Title'
import { Control, FieldValues } from 'react-hook-form'
import { BasicTextField } from './BasicTextField'

interface Props {
  title: string
  isOpen: boolean
  control: Control<FieldValues, any>
  inputNames: string[]
  handleClose: () => void
  handleSubmit: () => void
  submitText?: string
  cancelText?: string
}

export const BasicPutModal: React.FC<Props> = ({
  title,
  isOpen,
  control,
  inputNames,
  handleClose,
  handleSubmit,
  submitText = '完了',
  cancelText = 'キャンセル',
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
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Title>{title}</Title>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <form>
              {inputNames.map((name) => (
                <Box key={name}>
                  <BasicTextField
                    name={name}
                    control={control}
                    label={name}
                    autoComplete=''
                  />
                </Box>
              ))}
              <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => {
                    handleClose()
                  }}
                >
                  {cancelText}
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
                  {submitText}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
