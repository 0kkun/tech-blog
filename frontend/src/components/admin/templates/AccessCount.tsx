import * as React from 'react'
import Typography from '@mui/material/Typography'
import Title from './Title'

export const AccessCount = () => {
  const totalAccessCount = 3024
  const updatedAt = '2023/7/1'
  return (
    <React.Fragment>
      <Title>アクセス数累計</Title>
      <Typography component="p" variant="h4">
        {totalAccessCount}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {updatedAt}時点
      </Typography>
      <div></div>
    </React.Fragment>
  )
}
