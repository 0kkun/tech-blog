import { useState } from 'react'
import { sendGetMeApi, sendLogoutApi } from './authApi'
import { User } from './user'

// NOTE: current_userをグローバル管理してどのコンポーネントでも使えるようにしたい

export const getTokenInCookie = () => {
  return document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

export const useAuth = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const [currentUser, setCurrentUser] = useState<User>()

  const getMe = async (): Promise<any> => {
    try {
      console.log('useAuth getMe APIスタート')
      const response = await sendGetMeApi()
      // if (response.status === 200) {
      // レスポンスデータを状態として更新
      console.log('useAuth getMe Success')
      // setCurrentUser(response.data as User)
      return response
      // } else if (response.status === 403 || response.status === 401) {
      //   console.log('401 or 403が返された')
      //   return 'NOT_AUTHENTICATED'
      // }
    } catch (e) {
      console.log(e)
      return 'SERVER_ERRROR'
    }
  }

  const logout = async () => {
    try {
      await sendLogoutApi()
      return
    } catch (e) {
      console.log(e)
      return 'SERVER_ERRROR'
    }
  }

  return {
    // isAuthenticated,
    // setIsAuthenticated,
    // currentUser,
    getMe,
    logout,
  }
}
