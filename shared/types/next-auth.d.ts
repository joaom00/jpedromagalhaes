import NextAuth from 'next-auth'

type Role = 'USER' | 'ADMIN'

declare module 'next-auth' {
  interface Session {
    user: {
      name: string
      email: string
      image: string
      role: Role
    }
  }
  interface User {
    name: string
    email: string
    image: string
    role: Role
  }
}
