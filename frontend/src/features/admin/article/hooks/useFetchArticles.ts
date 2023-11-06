import { useState } from 'react'
import { sendFetchArticlesApi } from '../apis/articleApi'
import { Article } from '../types/article'

export const useFetchArticles = () => {
  const [articles, setArticles] = useState<Article[]>([])

  const fetchArticles = async (isPublished: boolean, tagName?: string, targetYm?: string) => {
    let response
    try {
      response = await sendFetchArticlesApi(isPublished, tagName, targetYm)
      if (response.status === 200) {
        // レスポンスデータを状態として更新
        setArticles(response.data as Article[])
      }
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return {
    fetchArticles,
    articles,
    setArticles,
  }
}
