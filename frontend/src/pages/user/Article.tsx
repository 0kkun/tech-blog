import React, { useEffect, useState } from 'react'
import { useGetArticle } from '../../features/admin/article/hooks/useGetArticle'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { MarkdownPreview } from '../../features/admin/article/components/MarkdownPreview'
import { UserTemplate } from '../../components/user/templates/UserTemplate'

export const Article: React.FC = () => {
  const getArticleHooks = useGetArticle()
  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  // パスパラメータからarticleIdを取得
  const { articleId } = useParams<{ articleId: string }>()

  useEffect(() => {
    const fetchInitialData = async () => {
      const userAgent = window.navigator.userAgent
      console.log('User Agent:', userAgent)
      if (articleId) {
        const article = await getArticleHooks.getArticle(Number(articleId))
        if (article) {
          setContent(article.content)
          setTitle(article.title)
        }
        setIsLoading(false)
      }
    }
    fetchInitialData()
  }, [])

  return (
    <>
      <UserTemplate isShowBanner={false}>
        {isLoading ? (
          // ローディング中の表示
          <p>Loading...</p>
        ) : (
          <Box>
            <Box sx={{ fontSize: 40, fontWeight: 'bold' }}>{title}</Box>
            <MarkdownPreview inputText={content} />
          </Box>
        )}
      </UserTemplate>
    </>
  )
}
