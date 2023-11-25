import { sendPostAccessLogApi } from '../apis/accessLogApi'
import { PostAccessLogRequest } from '../types/accessCount'

export const usePostAccessCount = () => {
  const postAccessLog = async (visitUrl: string, userAgent: string, articleId?: number) => {
    let response
    try {
      const request: PostAccessLogRequest = {
        visit_url: visitUrl,
        article_id: articleId,
        user_agent: userAgent,
      }
      console.log(request)
      response = await sendPostAccessLogApi(request)
      return
    } catch (e) {
      console.log(e)
    }
  }
  return {
    postAccessLog,
  }
}
