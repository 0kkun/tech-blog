import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
  sections: ReadonlyArray<{
    title: string
    url: string
  }>
  title: string
}

export const Header: React.FC<Props> = ({ sections, title }) => {
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  }

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <RouterLink to="/" style={linkStyle}>
            {title}
          </RouterLink>
        </Typography>
        {/* TODO: 検索機能をいつか追加する */}
        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: 'space-between',
          overflowX: 'auto',
          backgroundColor: 'rgb(240, 240, 240)',
        }}
      >
        {sections.map((section) => (
          <div key={section.title}>
            <RouterLink to={section.url} style={linkStyle}>
              {section.title}
            </RouterLink>
          </div>
        ))}
      </Toolbar>
    </>
  )
}
