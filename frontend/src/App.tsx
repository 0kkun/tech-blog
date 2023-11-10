import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider'
import { useState, useEffect } from 'react'

type User ={
  name: string
}

export const App = () => {
  // const [currentUser, setCurrentUser] = useState<User | null>(null)
  // useEffect(() => {
  //   setCurrentUser({ 'name': '太郎' });
  // }, []);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

