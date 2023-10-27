import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { ArticleCard } from './ArticleCard'
import { useFetchArticles } from '../../../admin/article/hooks/useFetchArticles'

export const ArticleCardIndex: React.FC = () => {
  const fetchArticlesHooks = useFetchArticles()

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchArticlesHooks.fetchArticles(true)
    }
    fetchInitialData()
  }, [])

  return (
    <>
      <Grid container spacing={4}>
        {fetchArticlesHooks.articles.map((article) => (
          <Grid item xs={12} sm={6} key={article.id}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
