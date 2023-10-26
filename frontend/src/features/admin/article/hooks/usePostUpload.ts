import { sendPostUploadApi } from '../apis/uploadApi'
import { ImageData } from '../types/image'

export const usePostUpload = () => {
  const postUpload = async (file: FormData): Promise<ImageData | null> => {
    let response
    try {
      response = await sendPostUploadApi(file)
      if (response.status === 200 || response.status === 201) {
        return response.data as ImageData
      } else {
        console.log('Response status is not 200 or 201')
        return null
      }
    } catch (e) {
      console.log(e)
      return null
    }
  }
  return {
    postUpload,
  }
}
