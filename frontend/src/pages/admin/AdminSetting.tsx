import React, { useEffect, useState } from 'react'
import { AdminTemplate } from '../../components/admin/templates/AdminTemplate'
import { Grid, Paper } from '@mui/material/'
import { UsersTable } from '../../features/admin/setting/components/UsersTable'
import { useFetchUsers } from '../../features/admin/setting/hooks/useFetchUsers'


export const AdminSetting: React.FC = () => {
  const fetchUsersHooks = useFetchUsers()

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

  return (
    <>
      <AdminTemplate title="管理画面">
        <Grid container spacing={3}>
          <UsersTable
            title='ユーザ一覧'
            users={fetchUsersHooks.users}
          />
        </Grid>
      </AdminTemplate>
    </>
  )
}
