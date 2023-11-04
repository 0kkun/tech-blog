import { sendDeleteUserApi } from '../apis/userApi'

export const useDeleteUser = () => {
  const deleteUser = async (userId: number) => {
    let response
    try {
      response = await sendDeleteUserApi(userId)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return {
    deleteUser,
  }
}
