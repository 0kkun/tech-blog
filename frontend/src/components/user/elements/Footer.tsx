import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

interface Props {
  description: string
  title: string
}

export const Footer: React.FC<Props> = ({ description, title }) => {
  const Copyright = () => {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Teck Blog
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
  }

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  )
}
