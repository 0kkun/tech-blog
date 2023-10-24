export type Article = {
  id: number
  title: string
  content: string
  // count: number
  created_at: string
  updated_at: string
  target_month: number
  target_year: number
  tags: Tag[]
}

export type PutArticleRequest = {
  id?: number
  title: string
  content: string
  is_published: boolean
  tags: Tag[]
}

export type Tag = {
  id: number
  name: string
}
