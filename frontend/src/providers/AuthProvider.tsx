import React, { createContext, useState, Dispatch, SetStateAction } from 'react'
import { User } from '../hooks/user'

export const authContext = createContext<User | null>(null)
export const setAuthContext = createContext<Dispatch<SetStateAction<User | null>>>(() => undefined)

interface Props {
  children: React.ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  return (
    <authContext.Provider value={currentUser}>
      <setAuthContext.Provider value={setCurrentUser}>{children}</setAuthContext.Provider>
    </authContext.Provider>
  )
}
