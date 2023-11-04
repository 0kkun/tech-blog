import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Grid,
  Paper,
} from '@mui/material'
import Title from '../../../../components/admin/elements/Title'
import { Tag } from '../types/tag'
import { TABLE_MAX_HEIGHT } from '../../../../config/viewConstant'

interface Props {
  title: string
  tags: Tag[]
  handleEditButton: (tag: Tag) => void
  handleDeleteButton: (tag: Tag) => void
}

export const TagTable: React.FC<Props> = ({
  title,
  tags,
  handleEditButton,
  handleDeleteButton,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>{title}</Title>
          <TableContainer style={{ maxHeight: TABLE_MAX_HEIGHT }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow style={{ backgroundColor: '#0000', height: '35px' }}>
                  <TableCell>名前</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tags.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell>{tag.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => {
                          handleEditButton(tag)
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
                          handleDeleteButton(tag)
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
