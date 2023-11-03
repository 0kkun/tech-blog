import React from 'react'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Link as RouterLink } from 'react-router-dom'
import { ClassNameMap } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

interface Props {
  classes: ClassNameMap<'link'>
}

export const Sidebar: React.FC<Props> = ({ classes }) => {
  return (
    <>
      <List component="nav">
        <RouterLink to="/admin" className={classes.link}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="ダッシュボード" />
          </ListItemButton>
        </RouterLink>
        <Divider sx={{ my: 1 }} />
        <ListSubheader component="div" inset>
          Action
        </ListSubheader>
        <RouterLink to="/admin/article/create" className={classes.link}>
          <ListItemButton>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="記事作成" />
          </ListItemButton>
        </RouterLink>
        <RouterLink to="/admin/articles" className={classes.link}>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="記事一覧" />
          </ListItemButton>
        </RouterLink>
        <RouterLink to="/admin/article/drafts" className={classes.link}>
          <ListItemButton>
            <ListItemIcon>
              <BorderColorIcon />
            </ListItemIcon>
            <ListItemText primary="下書一覧" />
          </ListItemButton>
        </RouterLink>
        <RouterLink to="/admin/tag" className={classes.link}>
          <ListItemButton>
            <ListItemIcon>
              <LocalOfferIcon />
            </ListItemIcon>
            <ListItemText primary="タグ一覧" />
          </ListItemButton>
        </RouterLink>
        <RouterLink to="/admin/setting" className={classes.link}>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="設定" />
          </ListItemButton>
        </RouterLink>
      </List>
    </>
  )
}
