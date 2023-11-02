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

interface Props {
  children: React.ReactNode
}

export const HomeTemplate: React.FC<Props> = ({ children }) => {
  const sections = [
    { title: 'Backend', url: '#' },
    { title: 'Frontend', url: '#' },
    { title: 'Infrastructure', url: '#' },
    { title: 'Architecture', url: '#' },
    { title: 'Other', url: '#' },
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
      { title: 'March 2020', url: '#' },
      { title: 'February 2020', url: '#' },
      { title: 'January 2020', url: '#' },
      { title: 'November 1999', url: '#' },
      { title: 'October 1999', url: '#' },
      { title: 'September 1999', url: '#' },
      { title: 'August 1999', url: '#' },
      { title: 'July 1999', url: '#' },
      { title: 'June 1999', url: '#' },
      { title: 'May 1999', url: '#' },
      { title: 'April 1999', url: '#' },
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
          <Banner post={contentsDescription} />
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
