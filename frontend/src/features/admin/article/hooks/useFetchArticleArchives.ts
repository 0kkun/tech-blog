import { useState } from 'react'
import { sendFetchArchiveApi } from '../apis/articleApi'
import { ArticleArchive } from '../types/article'

export const useFetchArticleArchives = () => {
  const [articleArchives, setArticleArchives] = useState<ArticleArchive[]>([])

  const fetchArchives = async () => {
    let response
    try {
      response = await sendFetchArchiveApi()
      if (response.status === 200) {
        // レスポンスデータを状態として更新
        setArticleArchives(response.data as ArticleArchive[])
      }
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return {
    fetchArchives,
    articleArchives,
  }
}
