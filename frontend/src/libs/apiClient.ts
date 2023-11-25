import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { logger } from './logger'

interface ApiClientInterface {
  get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>
  post(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse>
  put(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse>
  patch(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse>
  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>
  postFormData(url: string, file: FormData, config?: AxiosRequestConfig): Promise<AxiosResponse>
}

class ApiClient implements ApiClientInterface {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 10000,
      withCredentials: true,
    })

    this.instance.interceptors.request.use(
      (config) => {
        logger('interceptor', 'api REQUEST process start.')
        // Cookieからトークンを取得する
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
          '$1',
        )
        // トークンが存在する場合はAPIヘッダーにBearerトークンを設定する
        if (token) {
          logger('interceptor', 'exist token in cookie. set token into request header.')
          config.headers.Authorization = `Bearer ${token}`
        }
        logger('interceptor', 'api REQUEST process end.')
        return config
      },
      (error) => {
        console.error(error)
        return Promise.reject(error)
      },
    )

    // axiosのresponseインターセプターを設定する
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        logger('interceptor', 'api RESPONSE process start.')
        // APIから返却されたトークンをCookieに保存する
        if (response.data?.token) {
          logger('interceptor', 'find token in response. token set into cookie.')
          this.setAuthToken(response.data.token)
        }
        logger('interceptor', 'api REAPONSE process end.')
        return response
      },
      (error: AxiosError<any>) => {
        console.error(error)
        return Promise.reject(error)
      },
    )
  }

  public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.get(url, config)
  }

  public post(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.post(url, data, config)
  }

  public put(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.put(url, data, config)
  }

  public patch(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.patch(url, data, config)
  }

  public delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.delete(url, config)
  }

  public postFormData(
    url: string,
    file: FormData,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    const updatedConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    }
    return this.instance.post(url, file, updatedConfig)
  }

  /**
   * アクセストークンをcookieにセットする
   * @param token
   */
  private setAuthToken(token: string): void {
    if (token) {
      const expires = new Date()
      expires.setDate(expires.getDate() + 7)
      // Cookieにトークンを保存する
      document.cookie = `access_token=${token}; expires=${expires.toUTCString()}; path=/`
      logger('', 'Complete set access_token to cookie')
    } else {
      logger('', 'access_token delete')
      // Cookieからトークンを削除する
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
  }

  unsetAuthToken(): void {
    this.setAuthToken('')
    logger('', 'Delete access_token.')
  }
}

export default new ApiClient()
