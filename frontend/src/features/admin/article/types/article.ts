export type Article = {
  id: number
  title: string
  content: string
  // count: number
  created_at: string
  updated_at: string
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
