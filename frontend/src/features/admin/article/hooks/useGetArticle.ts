import { useState } from 'react'
import { sendGetArticleApi } from '../apis/articleApi'
import { Article } from '../types/article'

export const useGetArticle = () => {
  const [article, setArticle] = useState<Article>()

  const getArticle = async (articleId: number): Promise<Article | undefined> => {
    let response
    try {
      response = await sendGetArticleApi(articleId)
      if (response.status === 200) {
        // レスポンスデータを状態として更新
        setArticle(response.data as Article)
      }
      return response.data as Article
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
