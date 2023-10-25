import React, { useRef } from 'react'
import {
  Button,
  Box,
} from '@mui/material'
import { usePostUpload } from '../hooks/usePostUpload'
import { PostUploadResponse } from '../types/upload'

interface Props {
  handleUpSuccess: (image: PostUploadResponse) => void
}

export const FileUploadUI: React.FC<Props> = ({ handleUpSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const postUploadHooks = usePostUpload()

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // ファイルが選択されたらここでファイルを処理する
      const selectedFile = files[0]
      const formData = new FormData()
      formData.append('file', selectedFile)
      const image = await postUploadHooks.postUpload(formData)
      if (image) {
        handleUpSuccess(image)
      } else {
        console.error('Upload Failed. null returned.')
      }
    }
  }

  return (
    <>
      <Box>
        <Button
          variant="contained"
          color='info'
          sx={{ marginLeft: 2, width: '100px' }}
          onClick={() => { handleUploadClick() }}
        >
          画像添付
        </Button>
        <input
          hidden
          ref={fileInputRef}
          type="file"
          onChange={ (e) => { onFileInputChange(e) }}
        />
      </Box>
    </>
  )
}