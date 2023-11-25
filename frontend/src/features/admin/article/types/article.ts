import { ImageData } from './image'

export type Article = {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
  target_month: number
  target_year: number
  tags: Tag[]
  images?: ImageData[]
  thumbnail_image?: ImageData
  access_count?: number
}

export type PutArticleRequest = {
  id?: number
  title: string
  content: string
  is_published: boolean
  tags: Tag[]
  images?: ImageData[]
  thumbnail_image?: ImageData
}

export type Tag = {
  id: number
  name: string
}
