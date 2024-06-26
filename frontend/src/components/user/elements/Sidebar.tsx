import * as React from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import { ArticleArchive } from '../../../features/admin/article/types/article'

interface Props {
  archives: ArticleArchive[]
  description: string
  social: ReadonlyArray<{
    icon: React.ElementType
    name: string
    url: string
  }>
  title: string
}

export const Sidebar: React.FC<Props> = ({ archives, description, social, title }) => {
  return (
    <Grid item xs={12} md={12}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Archives
      </Typography>
      {archives.map((archive) => (
        <div key={archive.title}>
          <RouterLink to={'/?target_ym=' + archive.target_ym}>
            {archive.title}
          </RouterLink>
        </div>
      ))}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href={network.url}
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </Grid>
  )
}
