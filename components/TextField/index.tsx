import React from 'react'

type TextFieldProps = {
  className?: string
  onInputChange?: (value: string) => void
  initialValue?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function TextField({ className, initialValue = '', onInputChange, ...props }: TextFieldProps) {
  const [value, setValue] = React.useState(initialValue)

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setValue(newValue)

    !!onInputChange && onInputChange(newValue)
  }

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`rounded-md bg-gray-200 dark:bg-gray-800 ring-offset-white dark:focus:ring-offset-black focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  )
}
