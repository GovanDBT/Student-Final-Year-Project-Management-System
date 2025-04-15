import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/client";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: 'Email', type: 'email', placeholder: 'Email'},
          password: { label: 'Password', type: 'password', placeholder: 'Password' }
        },
        async authorize(credentials, req) {
          if (!credentials?.email || !credentials.password) return null;

          const user = await prisma.user.findUnique({ where: { email: credentials.email } });

          if (!user) return null
          
          if (credentials.password === user.password!) {
            return user
          }
          return null;
        }
      })
    ],
    pages: {
    signIn: "/"
  },
  session: {
    strategy: 'jwt'
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }