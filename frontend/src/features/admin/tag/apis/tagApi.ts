import { AxiosError, isAxiosError, AxiosResponse } from 'axios'
import ApiClient from '../../../../libs/apiClient'
import { TAG_ENDPOINT } from '../../../../config/apiEndpoints'
import { PutTagRequest } from '../types/tag'

export const sendFetchTagsApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.get(TAG_ENDPOINT)
    console.log('fetch tags api success!')
    return response
  } catch (error) {
    console.log('fetch tags api failed!')
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

export const sendPutTagApi = async (request: PutTagRequest): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.put(TAG_ENDPOINT, request)
    console.log('put tag api success!')
    return response
  } catch (error) {
    console.log('put tag api failed!')
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

export const sendDeleteTagApi = async (tagId: number): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.delete(TAG_ENDPOINT + '/' + tagId)
    console.log('delete tag api success!')
    return response
  } catch (error) {
    console.log('delete tag api failed!')
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
