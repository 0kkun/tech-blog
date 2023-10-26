import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

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
      baseURL: 'http://localhost:8080',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 10000,
      withCredentials: true,
    })
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
}

export default new ApiClient()
