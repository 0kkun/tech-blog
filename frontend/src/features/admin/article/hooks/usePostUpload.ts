import { useState } from 'react'
import { sendPostUploadApi } from '../apis/uploadApi'
import { PostUploadResponse } from '../types/upload'



export const usePostUpload = () => {
  const [fileUrls, setFileUrls] = useState<string[]>([])

  const postUpload = async (file: FormData): Promise<PostUploadResponse | null> => {
    let response
    try {
      response = await sendPostUploadApi(file)
      if (response.status === 200 || response.status === 201) {
        setFileUrls(response.data)
        return response.data as PostUploadResponse
      } else {
        console.log('Response status is not 200 or 201');
        return null
      }
    } catch (e) {
      console.log(e)
      return null
    }
  }
  return {
    postUpload,
    fileUrls,
  }
}
