import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'lib/prisma'

export default NextAuth({
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: String(process.env.TWITTER_CLIENT_ID),
      clientSecret: String(process.env.TWITTER_CLIENT_SECRET)
    }),
    GithubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET)
    })
  ],
  callbacks: {
    async session({ session }) {
      const user = await prisma.user.findUnique({ where: { email: session.user.email } })

      if (user) {
        session.user.role = user?.role
        return session
      }

      return session
    }
  }
})
