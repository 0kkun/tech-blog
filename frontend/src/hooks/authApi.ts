import { AxiosError, isAxiosError, AxiosResponse } from 'axios'
import ApiClient from '../libs/apiClient'
import { USERS_ME_ENDPOINT, USER_LOGOUT_ENDPOINT } from '../config/apiEndpoints'

export const sendGetMeApi = async (): Promise<any> => {
  try {
    const response = await ApiClient.get(USERS_ME_ENDPOINT)
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

export const sendLogoutApi = async () => {
  try {
    const response = await ApiClient.post(USER_LOGOUT_ENDPOINT)
    if (response.status == 200) {
      console.log('logout api success!')
      return
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

