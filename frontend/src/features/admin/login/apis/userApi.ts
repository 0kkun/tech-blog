import { AxiosError, isAxiosError, AxiosResponse } from 'axios'
import ApiClient from '../../../../libs/apiClient'
import { LOGIN_ENDPOINT } from '../../../../config/apiEndpoints'
import { LoginRequest } from '../types/user'

export const sendLoginApi = async (request: LoginRequest): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.post(LOGIN_ENDPOINT, request)
    console.log('login api success!')
    return response
  } catch (error) {
    console.log('login api failed!')
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
