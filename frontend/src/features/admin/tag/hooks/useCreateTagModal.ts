import { useState } from 'react'

export const useCreateTagModal = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return {
    open,
    setOpen,
    handleOpen,
    handleClose,
  }
}
