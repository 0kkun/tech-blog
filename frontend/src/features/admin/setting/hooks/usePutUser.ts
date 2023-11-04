import { sendPutUserApi } from '../apis/userApi'
import { useForm, FieldValues } from 'react-hook-form'
import { PutUserRequest } from '../types/user'

export const usePutUser = () => {
  const {
    getValues,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>()

  const putUser = async (userId?: number): Promise<void> => {
    try {
      let response
      const values = getValues()
      const request: PutUserRequest = {
        id: userId ?? undefined,
        name: values.name,
        email: values.email,
      }
      response = await sendPutUserApi(request)
      if (response.status === 200) {
        console.log(response.data)
        return
      }
    } catch (e) {
      console.log(e)
    }
  }
  return {
    putUser,
    control,
    setValue,
    reset,
  }
}
