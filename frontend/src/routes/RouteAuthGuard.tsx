import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getTokenInCookie } from '../hooks/useAuth'
import { sendGetMeApi } from '../hooks/getMeApi'
import { logger } from '../libs/logger'
import { Loading } from '../components/admin/elements/Loading'

type Props = {
  component: React.ReactNode
  redirect: string
}

export const RouteAuthGuard: React.FC<Props> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const location = useLocation()
  const token = getTokenInCookie()
  const hasToken = Boolean(token)
  const executeToRedirect = () => {
    return <Navigate to={props.redirect} state={{ from: location }} replace={false} />
  }

  if (!hasToken) {
    logger('guard', 'token is not set. redirect to login page.')
    // トークンがセットされていないならリダイレクト
    return executeToRedirect()
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await sendGetMeApi()
        if (response.status === 200) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        setIsAuthenticated(false)
      }
    }
    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    return <Loading isOpen={true} />
  }

  if (!isAuthenticated) {
    logger('guard', 'user not authenticated')
    return executeToRedirect()
  } else {
    logger('guard', 'user authenticated')
    return <>{props.component}</>
  }
}
