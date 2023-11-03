import { AxiosError, isAxiosError, AxiosResponse } from 'axios'
import ApiClient from '../../../../libs/apiClient'
import { USERS_ENDPOINT } from '../../../../config/apiEndpoints'
import { User } from '../types/user'

export const sendFetchUsersApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.get(USERS_ENDPOINT)
    console.log('fetch users api success!')
    return response
  } catch (error) {
    console.log('fetch users api failed!')
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