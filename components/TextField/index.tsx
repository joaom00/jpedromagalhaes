import React from 'react'

type TextFieldProps = React.ComponentPropsWithoutRef<'input'>

export default function TextField({ className, ...props }: TextFieldProps) {
  return (
    <input
      type="text"
      className={`rounded-md bg-mauve3 ring-offset-white placeholder:text-slate11 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-mauveDark3 dark:placeholder:text-slateDark11 dark:focus:ring-offset-black ${className}`}
      {...props}
    />
  )
}
