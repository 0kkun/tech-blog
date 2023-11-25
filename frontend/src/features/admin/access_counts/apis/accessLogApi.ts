import { AxiosError, isAxiosError, AxiosResponse } from 'axios'
import ApiClient from '../../../../libs/apiClient'
import { ACCESS_LOG_ENDPOINT } from '../../../../config/apiEndpoints'
import { PostAccessLogRequest } from '../types/accessCount'


export const sendFetchAccessLogsApi = async (
  target_year: number,
  target_month: number,
): Promise<AxiosResponse> => {
  try {
    let endpoint = ACCESS_LOG_ENDPOINT + '?target_year=' + target_year + '&target_month=' + target_month
    const response = await ApiClient.get(endpoint)
    console.log('fetch access logs api success!')
    return response
  } catch (error) {
    console.log('fetch access logs api failed!')
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


export const sendPostAccessLogApi = async (request: PostAccessLogRequest): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.post(ACCESS_LOG_ENDPOINT, request)
    console.log('post access log api success!')
    return response
  } catch (error) {
    console.log('put access log api failed!')
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