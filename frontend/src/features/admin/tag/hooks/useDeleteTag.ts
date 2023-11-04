import { sendDeleteTagApi } from '../apis/tagApi'

export const useDeleteTag = () => {
  const deleteTag = async (tagId: number) => {
    let response
    try {
      response = await sendDeleteTagApi(tagId)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return {
    deleteTag,
  }
}
