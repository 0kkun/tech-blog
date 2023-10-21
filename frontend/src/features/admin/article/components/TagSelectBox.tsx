import React from 'react'
import { Paper, Box, TextField, Autocomplete, Stack } from '@mui/material'
import { Tag } from '../types/article'
import { Control, Controller, FieldValues } from 'react-hook-form'

interface Props {
  label: string
  name: string
  tags: Tag[]
  control: Control<FieldValues, any>
}

export const TagSelectBox: React.FC<Props> = ({ label, name, tags, control }) => {
  return (
    <>
      <Paper
        sx={{
          p: 2,
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 100,
          width: '100%',
        }}
      >
        <Stack spacing={3}>
          <Controller
            name={name}
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                fullWidth
                id={`select-tag`}
                options={tags}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                onChange={(_e, newValue) => field.onChange(newValue)}
                renderOption={(props, option) => {
                  return (
                    <Box component="li" {...props} key={option.id}>
                      {option.name}
                    </Box>
                  )
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label={label} placeholder="search" />
                )}
              />
            )}
          />
        </Stack>
      </Paper>
    </>
  )
}
