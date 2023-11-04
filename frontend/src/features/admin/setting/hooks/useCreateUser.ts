import { sendCreateUserApi } from '../apis/userApi'
import { useForm, FieldValues } from 'react-hook-form'
import { CreateUserRequest } from '../types/user'

export const useCreateUser = () => {
  const {
    getValues,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>()

  const inputNames = ['name', 'email', 'password', 'role']

  const createUser = async (): Promise<void> => {
    try {
      let response
      const values = getValues()
      const request: CreateUserRequest = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      }
      response = await sendCreateUserApi(request)
      if (response.status === 200) {
        console.log(response.data)
        reset()
        return
      }
    } catch (e) {
      console.error(e)
    }
  }
  return {
    createUser,
    control,
    setValue,
    reset,
    inputNames,
  }
}
