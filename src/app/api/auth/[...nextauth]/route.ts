import NextAuth, { AuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
export const dynamic = 'force-dynamic'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
const prisma = new PrismaClient()
const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // token.role = user.role
        token.id = user.id
      }

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }