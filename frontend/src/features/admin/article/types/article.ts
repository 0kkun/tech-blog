
export type Article = {
  id: number
  date: string
  title: string
  count: number
}

export type PutArticleRequest = {
  id?: number
  title: string
  content: string
  is_published: boolean
}

export type Tag = {
  id: number
  name: string
}