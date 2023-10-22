import { useState } from 'react'
import { sendGetArticleApi } from '../apis/articleApi'
import { Article } from '../types/article'

export const useGetArticle = () => {
  const [article, setArticle] = useState<Article>()

  const getArticle = async (article_id: number) => {
    let response
    try {
      response = await sendGetArticleApi(article_id)
      if (response.status === 200) {
        // レスポンスデータを状態として更新
        setArticle(response.data as Article)
      }
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return {
    getArticle,
    article,
    setArticle,
  }
}
