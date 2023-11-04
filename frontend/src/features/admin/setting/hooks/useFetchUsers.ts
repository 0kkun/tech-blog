import { useState } from 'react'
import { sendFetchUsersApi } from '../apis/userApi'
import { User } from '../types/user'

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    let response
    try {
      response = await sendFetchUsersApi()
      if (response.status === 200) {
        // レスポンスデータを状態として更新
        setUsers(response.data as User[])
      }
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return {
    fetchUsers,
    users,
    setUsers,
  }
}
