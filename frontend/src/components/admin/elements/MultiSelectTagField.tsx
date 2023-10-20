import React from 'react'
import {
  TextField,
  Autocomplete,
  Stack,
  Box,
} from '@mui/material'
import { FieldValues, UseFormSetValue } from 'react-hook-form'


export interface MultiSelectTagFieldProps {
  label: string
  tags: Tag[]
  name: string
  setValue: UseFormSetValue<FieldValues>
}

export type Tag = {
  id: number
  name: string
}

/**
 * Referenve: https://mui.com/material-ui/react-autocomplete/#multiple-values
 */
export const MultiSelectTagField: React.FC<MultiSelectTagFieldProps> = ({ label, tags, name, setValue }) => {
  const handleSelected = (newValues: Tag[]) => {
    setValue(name, newValues)
  }

  return (
    <>
      <Stack spacing={3}>
        <Autocomplete
          multiple
          fullWidth
          id={`input-tag-${name}`}
          options={tags}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          onChange={(_e, newValue) => {
            handleSelected(newValue)
          }}
          renderOption={(props, option) => {
            return (
              <Box component="li" {...props} key={option.id}>
                {option.name}
              </Box>
            )
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label={label}
              placeholder="add"
            />
          )}
        />
      </Stack>
    </>
  )
}