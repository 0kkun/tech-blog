import React, { useState, } from 'react'
import {
  Button,
  Paper,
  Grid,
} from '@mui/material'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Title from '../../../../components/admin/elements/Title'
import { MultiSelectTagField } from '../../../../components/admin/elements/MultiSelectTagField'


/**
 * NOTE: Gridについて
 * xs : 横幅の指定。合計12になるように比率を指定する
 * 
 * NOTE: SyntaxHighlighterのstyleについて
 * https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
 */

export const CreateArticle: React.FC = () => {
  const { watch, register, getValues, setValue } = useForm()
  const inputText = watch('inputText')
  const paperStyle = {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 650,
  }
  const tags = [
    {id: 1, name: 'Laravel'},
    {id: 2, name: 'PHP'},
    {id: 3, name: 'Typescript'},
  ]

  const handleSubmit = () => {
    const values = getValues()
    console.log(values)
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
        <Grid item xs={8}>
          <Paper sx={{
            p: 2,
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 100,
          }}>
            <MultiSelectTagField
              label='タグ選択'
              tags={tags}
              name={'selectedTags'}
              setValue={setValue}
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* 新規投稿入力画面 */}
        <Grid item xs={6} md={3} lg={6}>
          <Paper sx={paperStyle}>
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
          <Paper sx={paperStyle}>
            <Title>プレビュー画面</Title>
            <div className='markdown-container'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: "h2",
                  h2: "h3",
                  h3: "h4",
                  h4: "h5",
                  h5: "h6",
                  h6: "h6",
                  code: ({
                    node,
                    inline,
                    className,
                    style,
                    children,
                    ...props
                  }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
                >
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