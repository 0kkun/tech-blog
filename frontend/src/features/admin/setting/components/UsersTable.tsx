import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Paper,
  Grid,
} from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { formatDateTime } from '../../../../libs/date'
import { Link as RouterLink } from 'react-router-dom'
import { TABLE_MAX_HEIGHT } from '../../../../config/viewConstant'
import { ConfirmModal } from '../../../../components/admin/elements/ConfirmModal'
import { CustomizedSnackbar } from '../../../../components/admin/elements/CustomizedSnackbar'
import { User } from '../types/user'

interface Props {
  title: string
  users: User[]
}

export const UsersTable: React.FC<Props> = ({ title, users }) => {
  // const fetchArticlesHooks = useFetchArticles()
  // const deleteArticleHooks = useDeleteArticle()
  const [selectedUser, setSelectedUser] = useState<User>()
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)

  // 初回遷移時に表示するデータを取得する
  // useEffect(() => {
  //   const fetchInitialData = async () => {
  //     try {
  //       if (isDraft) {
  //         await fetchArticlesHooks.fetchArticles(false)
  //       } else {
  //         await fetchArticlesHooks.fetchArticles(true)
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchInitialData()
  // }, [])

  const handleConfirmModalOpen = (user: User) => {
    setSelectedUser(user)
    setIsOpenConfirmModal(true)
  }

  const handleConfirmModalClose = () => {
    setIsOpenConfirmModal(false)
  }

  const handleConfirmSubmit = async () => {
    if (selectedUser) {
      // await deleteArticleHooks.deleteArticle(selectedArticle.id)
      // await fetchArticlesHooks.fetchArticles(true)
      handleSnackbarOpen()
    } else {
      console.error('selectedUser is undefined.')
    }
    handleConfirmModalClose()
  }

  const handleSnackbarOpen = () => {
    setIsOpenSnackbar(true)
  }

  const handleSnackbarClose = () => {
    setIsOpenSnackbar(false)
  }

  return (
    <>
      <CustomizedSnackbar
        isOpen={isOpenSnackbar}
        handleClose={() => {
          handleSnackbarClose()
        }}
        message="Success!"
      />
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        title="削除確認"
        description="ユーザーを1件削除します。よろしいですか？"
        handleClose={() => {
          handleConfirmModalClose()
        }}
        handleSubmit={() => {
          handleConfirmSubmit()
        }}
      />
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>{title}</Title>
          <TableContainer style={{ maxHeight: TABLE_MAX_HEIGHT }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>name</TableCell>
                  <TableCell>email</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <RouterLink to={`/admin/user/edit/${user.id}`}>
                        <Button variant="contained" color="success" size="small">
                          編集
                        </Button>
                      </RouterLink>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                          handleConfirmModalOpen(user)
                        }}
                      >
                        削除
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </>
  )
}
