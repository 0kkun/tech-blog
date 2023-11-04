import React, { useEffect, useState } from 'react'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { Grid } from '@mui/material/'
import { UsersTable } from '../../features/admin/setting/components/UsersTable'
import { useFetchUsers } from '../../features/admin/setting/hooks/useFetchUsers'
import { usePutUser } from '../../features/admin/setting/hooks/usePutUser'
import { User } from '../../features/admin/setting/types/user'
import { BasicEditModal } from '../../components/admin/elements/BasicEditModal'
import { CustomizedSnackbar } from '../../components/admin/elements/CustomizedSnackbar'
import { ConfirmModal } from '../../components/admin/elements/ConfirmModal'
import { useDeleteUser } from '../../features/admin/setting/hooks/useDeleteUser'

export const AdminSetting: React.FC = () => {
  const fetchUsersHooks = useFetchUsers()
  const putUserHooks = usePutUser()
  const deleteUserHooks = useDeleteUser()
  const [selectedUser, setSelectedUser] = useState<User>()
  const [isOpenUserEditModal, setIsOpenUserEditModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
  const userEditInputNames = ['name', 'email']

  // 初回遷移時に表示するデータを取得する
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchUsersHooks.fetchUsers()
      } catch (error) {
        console.log(error)
      }
    }
    fetchInitialData()
  }, [])

  // ユーザー一覧の編集ボタンが押下された時の処理
  const handleUserEditButton = (selectedUser: User) => {
    if (selectedUser) {
      // hooksに値をセットする
      putUserHooks.setValue('name', selectedUser.name)
      putUserHooks.setValue('email', selectedUser.email)
      setSelectedUser(selectedUser)
      // モーダルを開く
      setIsOpenUserEditModal(true)
    }
  }

  // ユーザー編集モーダルの完了が押下された時の処理
  const handleUserEditSubmit = async () => {
    if (selectedUser) {
      putUserHooks.putUser(selectedUser.id)
      putUserHooks.reset()
      setIsOpenSnackbar(true)
      // ユーザー一覧情報更新
      await fetchUsersHooks.fetchUsers()
    } else {
      console.error('user is not selected.')
    }
    setIsOpenUserEditModal(false)
  }

  const handleUserDeleteButton = (selectedUser: User) => {
    setSelectedUser(selectedUser)
    setIsOpenConfirmModal(true)
  }

  // ユーザー削除確認モーダルの実行が押下された時の処理
  const executeDeleteUser = async () => {
    if (selectedUser) {
      await deleteUserHooks.deleteUser(selectedUser.id)
      await fetchUsersHooks.fetchUsers()
      setIsOpenSnackbar(true)
    } else {
      console.error('selectedUser is undefined.')
    }
    setIsOpenConfirmModal(false)
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
        description="ユーザーを1件削除します。よろしいですか？"
        handleClose={() => {
          setIsOpenConfirmModal(false)
        }}
        handleSubmit={() => {
          executeDeleteUser()
        }}
      />
      <BasicEditModal
        title="ユーザー編集"
        isOpen={isOpenUserEditModal}
        inputNames={userEditInputNames}
        control={putUserHooks.control}
        handleClose={() => {
          setIsOpenUserEditModal(false)
        }}
        handleSubmit={handleUserEditSubmit}
      />
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
          <UsersTable
            title="ユーザ一覧"
            users={fetchUsersHooks.users}
            handleEditButton={handleUserEditButton}
            handleDeleteButton={handleUserDeleteButton}
          />
        </Grid>
      </AdminTemplate>
    </>
  )
}
