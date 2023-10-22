import * as React from 'react'
import Typography from '@mui/material/Typography'

import Title from '../../../../components/admin/elements/Title'
import { AccessCount } from '../types/accessCount'

export interface AccessCountProps {
  accessCount: AccessCount
}

export const AccessCountBox: React.FC<AccessCountProps> = ({ accessCount }) => {
  return (
    <React.Fragment>
      <Title>アクセス数累計</Title>
      <Typography component="p" variant="h4">
        {accessCount.totalAccessCount}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {accessCount.updatedAt}時点
      </Typography>
      <div></div>
    </React.Fragment>
  )
}
