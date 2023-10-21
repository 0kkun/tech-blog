import { sendDeleteArticleApi } from '../apis/articleApi'

export const useDeleteArticle = () => {
  const deleteArticle = async (article_id: number) => {
    let response
    try {
      response = await sendDeleteArticleApi(article_id)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return {
    deleteArticle,
  }
}
