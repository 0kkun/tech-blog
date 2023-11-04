import { sendEditUserApi } from '../apis/userApi'
import { useForm, FieldValues } from 'react-hook-form'
import { EditUserRequest } from '../types/user'

export const useEditUser = () => {
  const {
    getValues,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>()

  const inputNames = ['name', 'email']

  const editUser = async (userId: number): Promise<void> => {
    try {
      let response
      const values = getValues()
      const request: EditUserRequest = {
        id: userId,
        name: values.name,
        email: values.email,
      }
      response = await sendEditUserApi(request)
      if (response.status === 200) {
        console.log(response.data)
        return
      }
    } catch (e) {
      console.log(e)
    }
  }
  return {
    editUser,
    control,
    setValue,
    reset,
    inputNames,
  }
}
