import React from 'react'
import { Typography, Link } from '@mui/material'

interface Props {
  sx: any
}

export const Copyright: React.FC<Props> = ({ sx }) => {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center" {...sx}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          管理画面
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  )
}
