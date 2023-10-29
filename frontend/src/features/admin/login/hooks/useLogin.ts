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
      response = await sendLoginApi(request)
      if (response.status === 200) {
        console.log('ログインAPIが成功した')
        // console.log(response.data)
        // クッキーにトークンをセットする
        // setAuthToken(response.data.token)
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

/**
 * アクセストークンをcookieにセットする
 * @param token
 */
const setAuthToken = (token: string): void => {
  if (token) {
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)
    // Cookieにトークンを保存する
    document.cookie = `access_token=${token}; expires=${expires.toUTCString()}; path=/`
    console.log('Complete set access_token to cookie')
  } else {
    console.log('access_token delete')
    // Cookieからトークンを削除する
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }
}
