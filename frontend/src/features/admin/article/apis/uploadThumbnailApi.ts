import { AxiosError, isAxiosError, AxiosResponse } from 'axios'
import ApiClient from '../../../../libs/apiClient'
import { UPLOAD_THUMBNAIL_ENDPOINT } from '../../../../config/apiEndpoints'

export const sendPostUploadThumbnailApi = async (file: FormData): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.postFormData(UPLOAD_THUMBNAIL_ENDPOINT, file)
    console.log('post upload api success!')
    return response
  } catch (error) {
    console.log('post upload thumbnail api failed!')
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<any>
      if (axiosError.response) {
        console.log(axiosError.response.data)
        return axiosError.response.data
      } else {
        console.log(axiosError.message)
        throw new Error(axiosError.message)
      }
    } else {
      console.log(error)
      throw error
    }
  }
}
