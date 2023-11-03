import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound: React.FC = () => {
  return (
    <>
      <h1>404</h1>
      <h3>お探しのページは見つかりませんでした。</h3>
      <Link to="/">トップへ</Link>
    </>
  )
}
