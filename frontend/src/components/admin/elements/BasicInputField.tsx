import React from 'react'
import { Input } from '@mui/material'
import { FieldValues, Controller, Control } from 'react-hook-form'

export interface Props {
  placeholder: string
  name: string
  control: Control<FieldValues, any>
}

export const BasicInputField: React.FC<Props> = ({ placeholder, name, control }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={''}
        render={({ field }) => (
          <Input
            {...field}
            name={name}
            required
            placeholder={placeholder}
            sx={{ p: 1, width: '100%' }}
          />
        )}
      />
    </>
  )
}
