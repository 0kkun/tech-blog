import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { ArticleCard } from './ArticleCard'


export const ArticleCardIndex: React.FC = () => {
  const featuredPosts = [
    {
      id: 1,
      title: 'Featured post',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random?wallpapers',
      imageLabel: 'Image Text',
    },
    {
      id: 2,
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random?wallpapers',
      imageLabel: 'Image Text',
    },
    {
      id: 3,
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random?wallpapers',
      imageLabel: 'Image Text',
    },
  ]

  return (
    <>
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <Grid item xs={12} sm={6} key={post.id}>
            <ArticleCard post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}