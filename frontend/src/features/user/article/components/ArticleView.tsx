import { FC, useEffect, useState } from 'react'
import { ArticleTemplate } from '../../../../components/user/templates/ArticleTemplate'
import { MarkdownPreview } from '../../../admin/article/components/MarkdownPreview'
import { useGetArticle } from '../../../admin/article/hooks/useGetArticle'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

export const ArticleView: FC = () => {
  const getArticleHooks = useGetArticle()
  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  // パスパラメータからarticleIdを取得
  const { articleId } = useParams<{ articleId: string }>()

  useEffect(() => {
    const fetchInitialData = async () => {
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
    <ArticleTemplate>
      {isLoading ? (
        // ローディング中の表示
        <p>Loading...</p>
      ) : (
        <Box>
          <Box sx={{ fontSize: 40, fontWeight: 'bold' }}>{title}</Box>
          <MarkdownPreview inputText={content} />
        </Box>
      )}
    </ArticleTemplate>
  )
}
