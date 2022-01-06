import { Toaster } from 'react-hot-toast'

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      toastOptions={{
        className: 'relative bg-white dark:bg-gray-800 dark:text-white',
        duration: 3000,
        success: {
          duration: 3000,
          theme: {
            primary: 'green',
            secondary: 'black'
          }
        },
        error: {
          duration: 3000,
          theme: {
            primary: 'red',
            secondary: 'white'
          }
        }
      }}
    />
  )
}
