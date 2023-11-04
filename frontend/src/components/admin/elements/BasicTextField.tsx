import React from 'react'
import { TextField } from '@mui/material'
import { FieldValues, Controller, Control } from 'react-hook-form'

export interface Props {
  name: string
  label: string
  autoComplete: string
  control: Control<FieldValues, any>
  type?: string
}

export const BasicTextField: React.FC<Props> = ({ name, control, label, autoComplete, type }) => {
  if (name === 'password') {
    type = 'password'
  }
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={''}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id={name}
            label={label}
            name={name}
            autoComplete={autoComplete}
            autoFocus
            type={type}
          />
        )}
      />
    </>
  )
}
