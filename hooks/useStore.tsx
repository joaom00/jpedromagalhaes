import create from 'zustand'

interface Store {
  isOpenSidebar: boolean
  openSidebar: () => void
  closeSidebar: () => void
  isSignInDialogOpen: boolean
  setIsSignInDialogOpen: (open: boolean) => void
  openSignInDialog: () => void
  closeSignInDialog: () => void
}

export const useStore = create<Store>((set) => ({
  isOpenSidebar: false,
  openSidebar: () => set((state) => ({ ...state, isOpenSidebar: true })),
  closeSidebar: () => set((state) => ({ ...state, isOpenSidebar: false })),
  isSignInDialogOpen: false,
  setIsSignInDialogOpen: (open) => set((state) => ({ ...state, isSignInDialogOpen: open })),
  openSignInDialog: () => set((state) => ({ ...state, isSignInDialogOpen: true })),
  closeSignInDialog: () => set((state) => ({ ...state, isSignInDialogOpen: false }))
}))
