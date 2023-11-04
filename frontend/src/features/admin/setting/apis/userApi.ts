import { AxiosError, isAxiosError, AxiosResponse } from 'axios'
import ApiClient from '../../../../libs/apiClient'
import { USERS_ENDPOINT } from '../../../../config/apiEndpoints'
import { EditUserRequest, CreateUserRequest } from '../types/user'

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

export const sendEditUserApi = async (request: EditUserRequest): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.put(USERS_ENDPOINT, request)
    console.log('put users api success!')
    return response
  } catch (error) {
    console.log('put users api failed!')
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

export const sendDeleteUserApi = async (userId: number): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.delete(USERS_ENDPOINT + '/' + userId)
    console.log('delete user api success!')
    return response
  } catch (error) {
    console.log('delete user api failed!')
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

export const sendCreateUserApi = async (request: CreateUserRequest): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.post(USERS_ENDPOINT + '/register', request)
    console.log('create users api success!')
    return response
  } catch (error) {
    console.log('create users api failed!')
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
