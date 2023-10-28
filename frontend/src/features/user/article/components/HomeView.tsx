import { FC } from 'react'
import { HomeTemplate } from '../../../../components/user/templates/HomeTemplate'
import { ArticleCardIndex } from './ArticleCardIndex'

export const HomeView: FC = () => {
  return (
    <HomeTemplate>
      <ArticleCardIndex />
    </HomeTemplate>
  )
}
