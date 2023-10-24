import { sendPutTagApi } from '../apis/tagApi'
import { useForm, FieldValues } from 'react-hook-form'
import { PutTagRequest } from '../types/tag'

export const usePutTag = () => {
  const {
    getValues,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>()

  const putTag = async (tagId?: number) => {
    try {
      let response
      const values = getValues()
      const request: PutTagRequest = {
        id: tagId ?? undefined,
        name: values.name,
      }
      response = await sendPutTagApi(request)
      if (response.status === 200) {
        console.log(response.data)
        return
      }
    } catch (e) {
      console.log(e)
    }
  }
  return {
    putTag,
    control,
    setValue,
    reset,
  }
}
