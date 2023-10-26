import { sendDeleteTagApi } from '../apis/tagApi'

export const useDeleteTag = () => {
  const deleteTag = async (tag_id: number) => {
    let response
    try {
      response = await sendDeleteTagApi(tag_id)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return {
    deleteTag,
  }
}
