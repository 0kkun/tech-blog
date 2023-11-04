import React from 'react'
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
import { TABLE_MAX_HEIGHT } from '../../../../config/viewConstant'
import { User } from '../types/user'

interface Props {
  title: string
  users: User[]
  handleEditButton: (user: User) => void
  handleDeleteButton: (user: User) => void
}

export const UsersTable: React.FC<Props> = ({ title, users, handleEditButton, handleDeleteButton }) => {
  return (
    <>
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
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => {
                          handleEditButton(user)
                        }}
                      >
                        編集
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                          handleDeleteButton(user)
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
