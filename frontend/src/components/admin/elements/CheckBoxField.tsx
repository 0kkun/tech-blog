import React from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { FieldValues, Controller, Control } from 'react-hook-form'

export interface Props {
  label: string
  name: string
  control: Control<FieldValues, any>
}

export const CheckBoxField: React.FC<Props> = ({ label, name, control }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} sx={{ ml: 2, width: '100%' }} />}
            label={label}
            labelPlacement="end"
          />
        )}
      />
    </>
  )
}
