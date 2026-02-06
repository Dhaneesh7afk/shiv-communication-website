import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import { admin, firebaseConfigured } from "@/lib/firebaseAdmin"
import mongoose from "mongoose"

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Phone OTP",
      credentials: {
        idToken: { label: "Firebase ID Token", type: "text" },
      },
      async authorize(credentials) {
        if (!firebaseConfigured) {
          console.warn("Firebase Admin not configured. Phone auth is disabled.")
          return null
        }
        if (!credentials?.idToken) return null
        const decoded = await admin.auth().verifyIdToken(credentials.idToken)
        if (!decoded.phone_number) return null

        await connectDB()
        const user = await User.findOneAndUpdate(
          { phone: decoded.phone_number },
          {
            $set: {
              phone: decoded.phone_number,
              phoneVerified: true,
              authProvider: "phone",
              name: decoded.name || "Guest",
            },
          },
          { upsert: true, new: true }
        )

        return {
          id: user._id.toString(),
          name: user.name,
          phone: user.phone,
          authProvider: user.authProvider,
          phoneVerified: user.phoneVerified,
        } as any
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectDB()
      if (account?.provider === "google") {
        await User.findOneAndUpdate(
          { email: user.email },
          {
            $set: {
              name: user.name,
              email: user.email,
              image: user.image,
              authProvider: "google",
            },
          },
          { upsert: true, new: true }
        )
      }
      return true
    },
    async jwt({ token }) {
      await connectDB()
      const orQuery: any[] = []
      if (token.email) {
        orQuery.push({ email: token.email })
      }
      if (token.sub && mongoose.Types.ObjectId.isValid(token.sub)) {
        orQuery.push({ _id: token.sub })
      }
      const user = await User.findOne(orQuery.length ? { $or: orQuery } : {}).lean()
      if (user) {
        token.userId = user._id.toString()
        token.phone = user.phone
        token.phoneVerified = user.phoneVerified
        token.authProvider = user.authProvider
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string
        session.user.phone = token.phone as string | undefined
        session.user.phoneVerified = token.phoneVerified as boolean | undefined
        session.user.authProvider = token.authProvider as string | undefined
        session.user.image = token.image as string | undefined
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}
