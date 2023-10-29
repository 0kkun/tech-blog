import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@mui/material/styles'
import { BasicTheme } from '../../../config/theme'
import { Copyright } from '../elements/Copyright'

export interface Props {
  children: React.ReactNode
}

export const LoginTemplate: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={BasicTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {children}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
