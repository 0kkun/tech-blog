import { sendPostUploadThumbnailApi } from '../apis/uploadThumbnailApi'
import { ImageData } from '../types/image'

export const usePostUploadThumbnail = () => {
  const postUploadThumbnail = async (file: FormData): Promise<ImageData | null> => {
    let response
    try {
      response = await sendPostUploadThumbnailApi(file)
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
    postUploadThumbnail,
  }
}
