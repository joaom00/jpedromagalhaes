import React from 'react'

type NavigationProviderProps = {
  children: React.ReactNode
}

type NavigationContextData = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NavigationContext = React.createContext<NavigationContextData | undefined>(undefined)

// TODO: Refactor to use store maybe?
export default function NavigationProvider({ children }: NavigationProviderProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <NavigationContext.Provider value={{ open, setOpen }}>{children}</NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = React.useContext(NavigationContext)

  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }

  return context
}
