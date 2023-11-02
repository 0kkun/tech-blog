import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Props {
  inputText: string
}

export const MarkdownPreview: React.FC<Props> = ({ inputText }) => {
  const markdownStyles = `
    .markdown-container p {
      white-space: pre-wrap;
      margin: 5px 0px;
      width: 100%;
    }
    
    .markdown-container > h2 {
      display: block;
      width: 100%;
      padding: 10px 10px;
      color: #494949;
      border-bottom: 1px solid rgb(188, 185, 185);
    }
    
    .markdown-container > h3 {
      display: block;
      width: 100%;
      padding: 5px 5px;
      border-bottom: 1px solid rgb(188, 185, 185);
    }
    
    .markdown-container > p:has(> img) {
      text-align: center;
    }
    
    .markdown-container > p:has(> img) > img {
      width: 70%;
      display: inline-block;
    }
    
    .markdown-container > table {
      border-collapse: collapse;
    }
    
    .markdown-container > table > thead, th, td {
      border: 1px solid #ddd;
      padding: 6px 13px;
      text-align: left;
    }
    
    .markdown-container > table > thead {
      background-color: #f2f2f2;
    }
  `

  return (
    <>
      <div className="markdown-container">
        <style>{markdownStyles}</style>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: 'h2',
            h2: 'h3',
            h3: 'h4',
            h4: 'h5',
            h5: 'h6',
            h6: 'h6',
            code: ({ node, inline, className, style, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {inputText}
        </ReactMarkdown>
      </div>
    </>
  )
}
