import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getTokenInCookie } from '../hooks/useAuth'
import { sendGetMeApi } from '../hooks/getMeApi'
import { logger } from '../libs/logger'
import { Progress } from '../components/admin/elements/Progress'

type Props = {
  component: React.ReactNode
  redirect: string
}

export const RouteAuthGuard: React.FC<Props> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const location = useLocation()

  logger('guard', 'confirm token is set')
  const token = getTokenInCookie()
  const hasToken = Boolean(token)

  if (!hasToken) {
    logger('guard', 'token is not set. redirect to login page.')
    // トークンがセットされていないならリダイレクト
    return <Navigate to={props.redirect} state={{ from: location }} replace={false} />
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
    return <Progress isOpen={true} />
  }

  if (!isAuthenticated) {
    logger('guard', 'user not authenticated')
    return <Navigate to={props.redirect} state={{ from: location }} replace={false} />
  } else {
    logger('guard', 'user authenticated')
    return <>{props.component}</>
  }
}
