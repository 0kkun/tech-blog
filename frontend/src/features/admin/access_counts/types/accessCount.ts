export type AccessCount = {
  totalAccessCount: number
  updatedAt: string
}

export type PostAccessLogRequest = {
  visit_url: string
  user_agent: string
  article_id?: number
}

export type AccessLogDaily = {
  date: string
  access_count: number
}