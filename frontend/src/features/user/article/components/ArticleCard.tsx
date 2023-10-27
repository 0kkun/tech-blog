import * as React from 'react'
import { Typography, Card, CardActionArea, CardContent, CardMedia, Box } from '@mui/material'
import { Article } from '../../../admin/article/types/article'
import { Link } from 'react-router-dom'

interface Props {
  article: Article
}

export const ArticleCard: React.FC<Props> = ({ article }) => {
  const formatDate = (inputDate: string): string => {
    const date = new Date(inputDate)
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const year = date.getFullYear()
    const month = monthNames[date.getMonth()]
    const day = date.getDate()

    return `${year} ${month}.${day}`
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  }

  return (
    <>
      <Link to={'/article/' + article.id} style={linkStyle}>
        <CardActionArea component="div">
          <Card>
            <CardMedia
              component="img"
              sx={{ height: 170, width: 'auto', display: { xs: 'none', sm: 'block' } }}
              image="./laravel-logo4.png"
              alt={article.title}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {article.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {formatDate(article.created_at)}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ marginTop: 1 }}>
                {article.tags.map((tag) => (
                  <Box
                    key={tag.id}
                    sx={{
                      display: 'inline',
                      marginLeft: 1,
                      backgroundColor: 'rgb(200, 200, 200)',
                      borderRadius: '10px',
                      padding: '2px 10px',
                    }}
                  >
                    #{tag.name}
                  </Box>
                ))}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Link>
    </>
  )
}
