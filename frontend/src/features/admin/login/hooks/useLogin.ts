import { useState } from 'react'
import { sendLoginApi } from '../apis/userApi'
import { User, LoginRequest, LoginResponse } from '../types/user'
import { useForm, FieldValues } from 'react-hook-form'

export const useLogin = () => {
  const [tokenInfo, setTokenInfo] = useState<LoginResponse>()
  const {
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>()

  const postLogin = async () => {
    let response
    try {
      const values = getValues()
      const request: LoginRequest = {
        email: values.email,
        password: values.password,
      }
      console.log(request)
      response = await sendLoginApi(request)
      if (response.status === 200) {
        // レスポンスデータを状態として更新
        setTokenInfo(response.data as LoginResponse)
      }
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return {
    postLogin,
    control,
    errors,
    reset,
    tokenInfo,
  }
}
