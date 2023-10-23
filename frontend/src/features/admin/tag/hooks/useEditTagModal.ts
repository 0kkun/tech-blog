import { useState } from 'react'

export const useEditTagModal = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => {
    console.log('open:' + open)
    setOpen(true)
  }
  const handleClose = () => {
    console.log('close:' + open)
    setOpen(false)
  }

  return {
    open,
    setOpen,
    handleOpen,
    handleClose,
  }
}