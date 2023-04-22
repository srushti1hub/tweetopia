import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from "next-auth/providers/apple"
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  pages:{
    signIn: '/login'
  },
  session:{
    strategy: 'jwt'
  },
  callbacks:{
    session: async ({token,session}) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);