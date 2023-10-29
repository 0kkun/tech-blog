import React, { useEffect, useState } from 'react'
import { LoginTemplate } from '../../../../components/admin/templates/LoginTemplate'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useLogin } from '../hooks/useLogin'
import { BasicTextField } from '../../../../components/admin/elements/BasicTextField'

export const LoginView: React.FC = () => {
  const loginHooks = useLogin()

  const handleSubmit = async () => {
    await loginHooks.postLogin()
  }

  return (
    <>
      <LoginTemplate>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <BasicTextField
            name='email'
            control={loginHooks.control}
            label='Email Address'
            autoComplete='email'
          />
          <BasicTextField
            name='password'
            control={loginHooks.control}
            label='Password'
            autoComplete='current-password'
            type='password'
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              handleSubmit()
            }}
          >
            Sign In
          </Button>
        </Box>
      </LoginTemplate>
    </>
  )
}
