import React, { useState, } from 'react'
import {
  Button,
  Paper,
  Grid
} from '@mui/material'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import Title from '../../../../components/admin/elements/Title'


/**
 * NOTE: Gridについて
 * xs : 横幅の指定。合計12になるように比率を指定する
 */

export const CreateArticle: React.FC = () => {
  const { watch, register, getValues } = useForm()

  const inputText = watch('inputText')

  const handleSubmit = () => {
    const values = getValues()
    console.log(values.inputText)
  }

  // const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   const key = event.key
  //   if (key === 'Tab') {
  //     event.preventDefault()
  //     const textarea = event.currentTarget;
  //     const start = textarea.selectionStart;
  //     const end = textarea.selectionEnd;
  
  //     // カーソル位置にインデントを挿入
  //     const text = textarea.value;
  //     const newText = text.substring(0, start) + '\t' + text.substring(end);
      
  //     // 挿入後にカーソルを正しい位置に移動
  //     const newCursorPos = start + 1;
      
  //     textarea.value = newText;
  //     textarea.setSelectionRange(newCursorPos, newCursorPos);
  //   }
  // }

  return (
    <>
        <Grid container spacing={3}>
          {/* 新規投稿入力画面 */}
          <Grid item xs={6} md={3} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 650,
              }}
            >
              <Title>新規記事入力</Title>
              <TextareaAutosize
                aria-label="empty textarea"
                minRows={30}
                placeholder="Enter your text here"
                {...register('inputText')}
                // onKeyDown={(event) => {handleTextareaKeyDown(event)}}
              />
            </Paper>
          </Grid>
          {/* プレビュー画面 */}
          <Grid item xs={6} md={3} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 650,
              }}
            >
              <Title>プレビュー画面</Title>
              <div className='markdown-container'>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {inputText}
                </ReactMarkdown>
              </div>
            </Paper>
          </Grid>
          {/* Recent Articles */}
          <Grid item xs={12} justifyContent="end" spacing={1} container>
            <Grid item>
              <Button variant="contained" color="error" size="medium">
                クリア
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" size="medium">
                下書保存
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="success" size="medium" onClick={() => {handleSubmit()}}>
                投稿
              </Button>
            </Grid>
          </Grid>
        </Grid>
      
    </>
  )
}