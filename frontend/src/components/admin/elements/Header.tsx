import React from 'react'
import { ClassNameMap } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'

interface Props {
  classes: ClassNameMap<'link'>
  title: string
  logoutButton: () => void
}

export const Header: React.FC<Props> = ({ classes, title, logoutButton }) => {
  return (
    <>
      <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      <RouterLink to="/admin/login" className={classes.link}>
        <Button variant="outlined" style={{ color: 'white' }} sx={{ my: 1, mx: 1.5 }} onClick={logoutButton}>
          Logout
        </Button>
      </RouterLink>
    </>
  )
}
