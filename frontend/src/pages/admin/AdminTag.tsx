import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { TagTable } from '../../features/admin/tag/components/TagTable'
import { useFetchTags } from '../../features/admin/tag/hooks/useFetchTags'
import { usePutTag } from '../../features/admin/tag/hooks/usePutTag'
import { useDeleteTag } from '../../features/admin/tag/hooks/useDeleteTag'
import { CustomizedSnackbar } from '../../components/admin/elements/CustomizedSnackbar'
import { Tag } from '../../features/admin/tag/types/tag'
import { ConfirmModal } from '../../components/admin/elements/ConfirmModal'
import { BasicPutModal } from '../../components/admin/elements/BasicPutModal'

// タグ一覧画面
export const AdminTag: React.FC = () => {
  const fetchTagsHooks = useFetchTags()
  const putTagHooks = usePutTag()
  const deleteTagHooks = useDeleteTag()
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenTagEditModal, setIsOpenTagEditModal] = useState(false)
  const [isOpenTagCreateModal, setIsOpenTagCreateModal] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag>()

  // 初回遷移時に表示するデータを取得する
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchTagsHooks.fetchTags()
      } catch (error) {
        console.log(error)
      }
    }
    fetchInitialData()
  }, [])

  // タグ一覧の編集ボタンが押下された時の処理
  const handleTagEditButton = (selectedTag: Tag) => {
    if (selectedTag) {
      // hooksに値をセットする
      putTagHooks.setValue('name', selectedTag.name)
      setSelectedTag(selectedTag)
      // モーダルを開く
      setIsOpenTagEditModal(true)
    }
  }

  // タグ編集モーダルの完了が押下された時の処理
  const handleTagEditSubmit = async () => {
    if (selectedTag) {
      await putTagHooks.putTag(selectedTag.id)
      putTagHooks.reset()
      setIsOpenSnackbar(true)
      // タグ一覧情報更新
      await fetchTagsHooks.fetchTags()
    } else {
      console.error('selectedTag is not selected.')
    }
    setIsOpenTagEditModal(false)
  }

  // タグ一覧の削除ボタンが押下された時の処理
  const handleTagDeleteButton = (tag: Tag) => {
    setSelectedTag(tag)
    setIsOpenConfirmModal(true)
  }

  // タグ削除モーダルの実行ボタンが押下された時の処理
  const executeDeleteTag = async () => {
    if (selectedTag) {
      await deleteTagHooks.deleteTag(selectedTag.id)
      await fetchTagsHooks.fetchTags()
      setIsOpenSnackbar(true)
    } else {
      console.error('selectedTag is undefined.')
    }
    setIsOpenConfirmModal(false)
  }

  const handleTagCreateSubmit = async () => {
    await putTagHooks.putTag()
    putTagHooks.reset()
    setIsOpenSnackbar(true)
    // タグ一覧情報更新
    await fetchTagsHooks.fetchTags()
    setIsOpenTagCreateModal(false)
  }

  return (
    <>
      <CustomizedSnackbar
        isOpen={isOpenSnackbar}
        handleClose={() => {
          setIsOpenSnackbar(false)
        }}
        message="Success!"
      />
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        title="削除確認"
        description="タグを1件削除します。よろしいですか？"
        handleClose={() => {
          setIsOpenConfirmModal(false)
        }}
        handleSubmit={() => {
          executeDeleteTag()
        }}
      />
      <BasicPutModal
        title="タグ編集"
        isOpen={isOpenTagEditModal}
        inputNames={putTagHooks.inputNames}
        control={putTagHooks.control}
        handleClose={() => {
          setIsOpenTagEditModal(false)
        }}
        handleSubmit={handleTagEditSubmit}
      />
      <BasicPutModal
        title="タグ追加"
        isOpen={isOpenTagCreateModal}
        inputNames={putTagHooks.inputNames}
        control={putTagHooks.control}
        handleClose={() => {
          setIsOpenTagCreateModal(false)
        }}
        handleSubmit={handleTagCreateSubmit}
        submitText="追加"
      />
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
          <Grid item sx={{ width: '100%', textAlign: 'right' }}>
            <Button
              variant="contained"
              color="info"
              size="medium"
              sx={{ width: 100 }}
              onClick={() => {
                putTagHooks.reset()
                setIsOpenTagCreateModal(true)
              }}
            >
              新規追加
            </Button>
          </Grid>
          <TagTable
            title="タグ一覧"
            tags={fetchTagsHooks.tags}
            handleEditButton={handleTagEditButton}
            handleDeleteButton={handleTagDeleteButton}
          />
        </Grid>
      </AdminTemplate>
    </>
  )
}
