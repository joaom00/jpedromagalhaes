import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'

type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {
  className?: string
  onInputChange?: (value: string) => void
  initialValue?: string
  maxRows?: number
}

export function Textarea({ className, maxRows = 8, rows = 1, ...props }: TextAreaProps) {
  return (
    <TextareaAutosize
      maxRows={maxRows}
      rows={rows}
      className={`rounded-md bg-mauve3 placeholder-slate11 dark:bg-mauveDark3 dark:placeholder-slateDark11 ${className}`}
      {...props}
    />
  )
}
