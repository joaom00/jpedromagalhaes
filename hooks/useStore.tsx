import create from 'zustand'

interface Store {
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  isSignInDialogOpen: boolean
  setIsSignInDialogOpen: (open: boolean) => void
  openSignInDialog: () => void
  closeSignInDialog: () => void
}

export const useStore = create<Store>((set) => ({
  isSidebarOpen: false,
  openSidebar: () => set((state) => ({ ...state, isSidebarOpen: true })),
  closeSidebar: () => set((state) => ({ ...state, isSidebarOpen: false })),
  isSignInDialogOpen: false,
  setIsSignInDialogOpen: (open) => set((state) => ({ ...state, isSignInDialogOpen: open })),
  openSignInDialog: () => set((state) => ({ ...state, isSignInDialogOpen: true })),
  closeSignInDialog: () => set((state) => ({ ...state, isSignInDialogOpen: false }))
}))
