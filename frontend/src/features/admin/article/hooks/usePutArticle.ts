import { useState } from 'react'
import { sendPutArticleApi } from '../apis/articleApi'
import { Article, PutArticleRequest } from '../types/article'
import { useForm, FieldValues } from 'react-hook-form'

export const usePutArticle = () => {
  const [article, setArticle] = useState<Article>()
  const {
    getValues,
    watch,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>()

  const putArticles = async (isPublished: boolean, article_id?: number) => {
    let response
    try {
      const values = getValues()
      const request: PutArticleRequest = {
        id: article_id ?? undefined,
        title: values.title,
        content: values.inputText,
        is_published: isPublished,
      }
      console.log(request)
      response = await sendPutArticleApi(request)
      if (response.status === 200 || response.status === 201) {
        // レスポンスデータを状態として更新
        setArticle(response.data as Article)
        reset()
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
    watch,
    setValue,
    control,
    handleSubmit,
    errors,
    reset,
  }
}
