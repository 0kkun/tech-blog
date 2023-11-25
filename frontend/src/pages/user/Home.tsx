import React, { useEffect } from 'react'
import { UserTemplate } from '../../components/user/templates/UserTemplate'
import { ArticleCardIndex } from '../../features/user/article/components/ArticleCardIndex'
import { useFetchArticles } from '../../features/admin/article/hooks/useFetchArticles'
import { usePostAccessCount } from '../../features/admin/access_counts/hooks/usePostAccessLog'
import { useSearchParams, Navigate, useLocation } from 'react-router-dom'
import { PATH } from '../../routes/AppRoutes'

export const Home: React.FC = () => {
  const fetchArticlesHooks = useFetchArticles()
  const postAccessCountHooks = usePostAccessCount()
  const location = useLocation()
  // クエリパラメータから値取得
  const [searchParams] = useSearchParams()
  const targetYm = searchParams.get('target_ym') ?? undefined
  const tagName = searchParams.get('tag_name') ?? undefined

  // クエリパラメータのバリデーション
  if (targetYm) {
    const regex = /^\d{4}-\d{2}$/
    if (!regex.test(targetYm)) {
      return <Navigate to={PATH.notFound} state={{ from: location }} replace={false} />
    }
  }
  if (tagName) {
    // FIXME: 暫定対応
    if (tagName.length > 128) {
      return <Navigate to={PATH.notFound} state={{ from: location }} replace={false} />
    }
  }

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    const fetchInitialData = async () => {
      await fetchArticlesHooks.fetchArticles(true, tagName, targetYm)
      await postAccessCountHooks.postAccessLog('/', userAgent)
    }
    fetchInitialData()
  }, [])

  return (
    <>
      <UserTemplate isShowBanner={true}>
        <ArticleCardIndex articles={fetchArticlesHooks.articles} />
      </UserTemplate>
    </>
  )
}
