import { useState } from 'react'
import { sendFetchTagsApi } from '../apis/tagApi'
import { Tag } from '../types/tag'

export const useFetchTags = () => {
  const [tags, setTags] = useState<Tag[]>([])

  const fetchTags = async () => {
    let response
    try {
      response = await sendFetchTagsApi()
      if (response.status === 200) {
        // レスポンスデータを状態として更新
        setTags(response.data as Tag[])
      }
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return {
    fetchTags,
    tags,
    setTags,
  }
}
