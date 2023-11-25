import React, { useEffect, useState, useContext } from 'react'
import { Grid, Button } from '@mui/material/'
import { useFetchUsers } from '../../features/admin/setting/hooks/useFetchUsers'
import { useDeleteUser } from '../../features/admin/setting/hooks/useDeleteUser'
import { useEditUser } from '../../features/admin/setting/hooks/useEditUser'
import { useCreateUser } from '../../features/admin/setting/hooks/useCreateUser'
import { User } from '../../features/admin/setting/types/user'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { UsersTable } from '../../features/admin/setting/components/UsersTable'
import { BasicPutModal } from '../../components/admin/elements/BasicPutModal'
import { CustomizedSnackbar } from '../../components/admin/elements/CustomizedSnackbar'
import { ConfirmModal } from '../../components/admin/elements/ConfirmModal'
import { authContext } from '../../providers/AuthProvider'
import { ADMIN } from '../../config/userRole'

export const AdminSetting: React.FC = () => {
  const currentUser = useContext(authContext)
  const fetchUsersHooks = useFetchUsers()
  const editUserHooks = useEditUser()
  const deleteUserHooks = useDeleteUser()
  const createUserHooks = useCreateUser()
  const [selectedUser, setSelectedUser] = useState<User>()
  const [isOpenUserEditModal, setIsOpenUserEditModal] = useState(false)
  const [isOpenUserCreateModal, setIsOpenUserCreateModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)

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
      editUserHooks.setValue('name', selectedUser.name)
      editUserHooks.setValue('email', selectedUser.email)
      editUserHooks.setValue('role', selectedUser.role)
      setSelectedUser(selectedUser)
      // モーダルを開く
      setIsOpenUserEditModal(true)
    }
  }

  // ユーザー編集モーダルの完了が押下された時の処理
  const handleUserEditSubmit = async () => {
    if (selectedUser) {
      if (currentUser?.role == ADMIN) {
        await editUserHooks.editUser(selectedUser.id)
      }
      editUserHooks.reset()
      setIsOpenSnackbar(true)
      // ユーザー一覧情報更新
      await fetchUsersHooks.fetchUsers()
    } else {
      console.error('user is not selected.')
    }
    setIsOpenUserEditModal(false)
  }

  const handleUserDeleteButton = (user: User) => {
    setSelectedUser(user)
    setIsOpenConfirmModal(true)
  }

  // ユーザー削除確認モーダルの実行が押下された時の処理
  const executeDeleteUser = async () => {
    if (selectedUser) {
      if (currentUser?.role == ADMIN) {
        await deleteUserHooks.deleteUser(selectedUser.id)
      }
      await fetchUsersHooks.fetchUsers()
      setIsOpenSnackbar(true)
    } else {
      console.error('selectedUser is undefined.')
    }
    setIsOpenConfirmModal(false)
  }

  // ユーザー追加モーダルの実行が押下された時の処理
  const handleUserCreateSubmit = async () => {
    if (currentUser?.role == ADMIN) {
      await createUserHooks.createUser()
    }
    await fetchUsersHooks.fetchUsers()
    setIsOpenUserCreateModal(false)
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
      <BasicPutModal
        title="ユーザー編集"
        isOpen={isOpenUserEditModal}
        inputNames={editUserHooks.inputNames}
        control={editUserHooks.control}
        handleClose={() => {
          setIsOpenUserEditModal(false)
        }}
        handleSubmit={handleUserEditSubmit}
      />
      <BasicPutModal
        title="ユーザー追加"
        isOpen={isOpenUserCreateModal}
        inputNames={createUserHooks.inputNames}
        control={createUserHooks.control}
        handleClose={() => {
          setIsOpenUserCreateModal(false)
        }}
        handleSubmit={handleUserCreateSubmit}
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
                createUserHooks.reset()
                setIsOpenUserCreateModal(true)
              }}
            >
              新規ユーザー追加
            </Button>
          </Grid>
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
