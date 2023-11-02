import { useState } from 'react'
import { sendLoginApi } from '../apis/userApi'
import { User, LoginRequest, LoginResponse } from '../types/user'
import { useForm, FieldValues } from 'react-hook-form'

export const useLogin = () => {
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
        console.log('login api recieve status code 200.')
        reset()
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
  }
}
