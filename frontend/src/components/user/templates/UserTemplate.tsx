import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import GitHubIcon from '@mui/icons-material/GitHub'
import TwitterIcon from '@mui/icons-material/Twitter'
import { ThemeProvider } from '@mui/material/styles'
import { Header } from '../elements/Header'
import { Banner } from '../elements/Banner'
import { Sidebar } from '../elements/Sidebar'
import { Footer } from '../elements/Footer'
import {
  AppName,
  AboutDescription,
  BannerTitle,
  BannnerDescription,
} from '../../../config/constantText'
import { BasicTheme } from '../../../config/theme'
import { BannerBackgroundImage } from '../../../config/constantImage'
import { Box } from '@mui/material'

interface Props {
  isShowBanner: boolean
  children: React.ReactNode
}

export const UserTemplate: React.FC<Props> = ({ isShowBanner, children }) => {
  const sections = [
    { title: 'Laravel', url: '?tag_name=Laravel' },
    { title: 'React', url: '?tag_name=React' },
    { title: 'AWS', url: '?tag_name=AWS' },
    { title: 'Architecture', url: '?tag_name=Architecture' },
  ]

  const contentsDescription = {
    title: BannerTitle,
    description: BannnerDescription,
    image: BannerBackgroundImage,
    imageText: 'テックブログ',
    linkText: '',
  }

  const sidebar = {
    title: 'About',
    description: AboutDescription,
    archives: [
      { title: 'November 2023', url: '?target_ym=2023-11' },
      { title: 'October 2023', url: '?target_ym=2023-11' },
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon, url: 'https://github.com/0kkun' },
      { name: 'Twitter', icon: TwitterIcon, url: 'https://twitter.com/Shin_Spcl_Prg' },
    ],
  }
  return (
    <ThemeProvider theme={BasicTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={AppName} sections={sections} />
        <main>
          {isShowBanner
            ? <Banner post={contentsDescription} />
            : <Box sx={{ height: '30px' }}></Box>
          }
          <Grid container spacing={4}>
            <Grid item xs={12} md={9}>
              {children}
            </Grid>
            <Grid item xs={12} md={3}>
              <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
              />
            </Grid>
          </Grid>
        </main>
      </Container>
      <Footer title={AppName} description="" />
    </ThemeProvider>
  )
}
