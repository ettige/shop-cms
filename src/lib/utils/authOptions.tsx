import{ AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
    }),
    DiscordProvider({
      clientId: String(process.env.DISCORD_ID),
      clientSecret: String(process.env.DISCORD_SECRET),
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        //check if email pattern
        if (credentials && emailRegex.test(String(credentials?.email))) {
          const credentialdb = await prisma.credential.findUnique({
            where: {
              email: credentials?.email
            }
          })
          if (credentialdb) {

            if (credentialdb?.password === credentials?.password) {
              const user = await prisma.user.findUnique({
                where: {
                  id: credentialdb.userId
                }
              })
              return user;
            }
          }
          else {

            const newUser = await prisma.user.create({
              data: {
                email: credentials.email
              }
            })
            const newcredential = await prisma.credential.create({
              data: {
                userId: newUser.id,
                email: credentials?.email,
                password: credentials?.password
              }
            })
            return newUser
          }
        }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ session, token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.

      return session
    }
  },
  pages: {
    signIn: "/signin"
  },
  adapter: PrismaAdapter(prisma),
};
export default authOptions