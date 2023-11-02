import React, { useRef } from 'react'
import { Button, Box } from '@mui/material'

interface Props {
  name: string
  title: string
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
  handleFileUpload: (file: FormData) => void
}

export const BasicFileUploadButton: React.FC<Props> = ({ name, title, color, handleFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      formData.append(name, selectedFile)
      handleFileUpload(formData)

      // fileのinput要素が存在していたらリセットする
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <Box>
        <Button
          variant="contained"
          color={color}
          onClick={() => {
            handleUploadClick()
          }}
        >
          {title}
        </Button>
        <input
          hidden
          ref={fileInputRef}
          type="file"
          onChange={(e) => {
            onFileInputChange(e)
          }}
        />
      </Box>
    </>
  )
}
