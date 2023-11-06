import { AxiosError, isAxiosError, AxiosResponse } from 'axios'
import ApiClient from '../../../../libs/apiClient'
import { ARTICLE_ENDPOINT } from '../../../../config/apiEndpoints'
import { PutArticleRequest } from '../types/article'

export const sendFetchArticlesApi = async (
  isPublished: boolean,
  tag_name?: string,
  target_ym?: string,
): Promise<AxiosResponse> => {
  try {
    let endpoint = ARTICLE_ENDPOINT + '?is_published=' + isPublished
    if (tag_name) {
      endpoint = endpoint + '&' + tag_name
    }
    if (target_ym) {
      endpoint = endpoint + '&' + target_ym
    }
    const response = await ApiClient.get(endpoint)
    console.log('fetch articles api success!')
    return response
  } catch (error) {
    console.log('fetch articles api failed!')
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

export const sendGetArticleApi = async (articleId: number): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.get(ARTICLE_ENDPOINT + '/' + articleId)
    console.log('get article api success!')
    return response
  } catch (error) {
    console.log('get article api failed!')
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

export const sendPutArticleApi = async (request: PutArticleRequest): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.put(ARTICLE_ENDPOINT, request)
    console.log('put article api success!')
    return response
  } catch (error) {
    console.log('put article api failed!')
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

export const sendDeleteArticleApi = async (articleId: number): Promise<AxiosResponse> => {
  try {
    const response = await ApiClient.delete(ARTICLE_ENDPOINT + '/' + articleId)
    console.log('delete article api success!')
    return response
  } catch (error) {
    console.log('delete article api failed!')
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
