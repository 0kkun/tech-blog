import { AxiosError, isAxiosError, AxiosResponse } from 'axios'
import ApiClient from '../libs/apiClient'
import { ME_ENDPOINT } from '../config/apiEndpoints'

export const sendGetMeApi = async (): Promise<any> => {
  try {
    const response = await ApiClient.get(ME_ENDPOINT)
    if (response.status == 200) {
      console.log('me api success!')
      // console.log(response.data)
      return response
    }
  } catch (error) {
    console.log('me api failed!')
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<any>
      if (axiosError.response) {
        console.log(axiosError.response)
        return axiosError.response
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
