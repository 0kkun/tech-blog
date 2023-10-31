import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

interface Props {
  isOpen: boolean
}

export const Progress: React.FC<Props> = ({ isOpen }) => {
  return (
    <>
      <Backdrop open={isOpen}>
        <CircularProgress />
      </Backdrop>
    </>
  )
}
