import React from 'react'
import { Grid } from '@mui/material'
import { ArticleCard } from './ArticleCard'
import { Article } from '../../../admin/article/types/article'

interface Props {
  articles: Article[]
}

export const ArticleCardIndex: React.FC<Props> = ({ articles }) => {
  return (
    <>
      <Grid container spacing={4}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} key={article.id}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
