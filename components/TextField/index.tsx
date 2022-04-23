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
      className={`rounded-md bg-mauve3 ring-offset-white placeholder:text-slate11 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-mauveDark3 dark:placeholder:text-slateDark11 dark:focus:ring-offset-black ${className}`}
      {...props}
    />
  )
}
