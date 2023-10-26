import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  isOpen: boolean
  handleClose: () => void
  message: string
}

export const CustomizedSnackbar: React.FC<Props> = ({ isOpen, handleClose, message }) => {
  const handleForceClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    handleClose()
  }

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <>
      <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleForceClose} action={action}>
        <MuiAlert
          onClose={handleForceClose}
          severity="success"
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </>
  )
}
