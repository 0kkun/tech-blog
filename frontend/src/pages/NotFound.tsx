import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

export const NotFound: React.FC = () => {
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h6">The page you’re looking for doesn’t exist.</Typography>
              <Button variant="contained">
                <Link to="/" style={linkStyle}>
                  Back Home
                </Link>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                width={500}
                height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
