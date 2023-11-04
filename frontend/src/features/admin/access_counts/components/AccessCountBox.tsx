import * as React from 'react'
import { Paper, Grid, Typography } from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { AccessCount } from '../types/accessCount'

export interface AccessCountProps {
  accessCount: AccessCount
}

export const AccessCountBox: React.FC<AccessCountProps> = ({ accessCount }) => {
  return (
    <>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Title>アクセス数累計</Title>
          <Typography component="p" variant="h4">
            {accessCount.totalAccessCount}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {accessCount.updatedAt}時点
          </Typography>
          <div></div>
        </Paper>
      </Grid>
    </>
  )
}
