import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider'

export const App = () => {
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
