import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'

type TextAreaProps = {
  className?: string
  onInputChange?: (value: string) => void
  initialValue?: string
  maxRows?: number
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export default function Textarea({
  className,
  maxRows = 8,
  rows = 1,
  initialValue = '',
  onInputChange,
  ...props
}: TextAreaProps) {
  const [value, setValue] = React.useState(initialValue)

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = e.target.value
    setValue(newValue)

    !!onInputChange && onInputChange(newValue)
  }

  return (
    <TextareaAutosize
      maxRows={maxRows}
      rows={rows}
      value={value}
      onChange={onChange}
      className={`rounded-md bg-mauve3 placeholder-slate11 dark:bg-mauveDark3 dark:placeholder-slateDark11 ${className}`}
      {...props}
    />
  )
}
