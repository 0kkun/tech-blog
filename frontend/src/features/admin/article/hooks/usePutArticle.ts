import { useState } from 'react'
import { sendPutArticleApi } from '../apis/articleApi'
import { Article, PutArticleRequest } from '../types/article'
import { useForm, FieldValues } from 'react-hook-form'

export const usePutArticle = () => {
  const [article, setArticle] = useState<Article>()

  const putArticles = async () => {
    let response
    const { getValues } = useForm<FieldValues>()
    try {
      const values = getValues()
      const request: PutArticleRequest = {
        id: values?.id,
        title: values.title,
        content: values.content,
        is_published: values.is_published,
      }
      console.log(request)
      response = await sendPutArticleApi(request)
      if (response.status === 200 || response.status === 201) {
        // レスポンスデータを状態として更新
        setArticle(response.data as Article)
      }
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return {
    putArticles,
    article,
    setArticle,
  }
}
