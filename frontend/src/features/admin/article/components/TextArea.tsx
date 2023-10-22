import React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { Control, Controller, FieldValues } from 'react-hook-form'

interface Props {
  placeholder: string
  name: string
  minRows: number
  control: Control<FieldValues, any>
}

export const TextArea: React.FC<Props> = ({ placeholder, minRows, name, control }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={''}
        render={({ field }) => (
          <TextareaAutosize
            {...field}
            aria-label="textarea"
            minRows={minRows}
            placeholder={placeholder}
          />
        )}
      />
    </>
  )
}
