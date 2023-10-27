import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import GitHubIcon from '@mui/icons-material/GitHub'
import TwitterIcon from '@mui/icons-material/Twitter'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Header } from '../elements/Header'
// import { Banner } from '../elements/Banner'
import { Sidebar } from '../elements/Sidebar'
import { Footer } from '../elements/Footer'
import { Box } from '@mui/material'

const defaultTheme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans JP',
      'Lato',
      '游ゴシック Medium',
      '游ゴシック体',
      'Yu Gothic Medium',
      'YuGothic',
      'ヒラギノ角ゴ ProN',
      'Hiragino Kaku Gothic ProN',
      'メイリオ',
      'Meiryo',
      'ＭＳ Ｐゴシック',
      'MS PGothic',
      'sans-serif',
    ].join(','),
  },
})

interface Props {
  children: React.ReactNode
}

export const ArticleTemplate: React.FC<Props> = ({ children }) => {
  const sections = [
    { title: 'Backend', url: '#' },
    { title: 'Frontend', url: '#' },
    { title: 'Infrastructure', url: '#' },
    { title: 'Architecture', url: '#' },
    { title: 'Other', url: '#' },
  ]

  const sidebar = {
    title: 'About',
    description:
      '2020年に製造業界からIT業界へ未経験転職。当時は30歳でした。受託企業で主にLaravel/PHPにて開発業務を行なってます。Laravel/PHP、React/TS、GithubActions、AWSの構成が好きです。',
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
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Tech Blog" sections={sections} />
        <main>
          <Box sx={{ height: '30px' }}></Box>
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
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </ThemeProvider>
  )
}
