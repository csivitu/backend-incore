import NextAuth from "next-auth"
import "next-auth/jwt"

export const runtime = "node"

import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import { createStorage } from "unstorage"
import vercelKVDriver from "unstorage/drivers/vercel-kv"
import { UnstorageAdapter } from "@auth/unstorage-adapter"
import prisma from "./lib/prisma"

const storage = createStorage({
  driver: vercelKVDriver({
    url: process.env.AUTH_KV_REST_API_URL,
    token: process.env.AUTH_KV_REST_API_TOKEN,
    env: false,
  })
})


const config = {
  adapter: UnstorageAdapter(storage),
  providers: [
    GitHub,
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    async jwt({ token, trigger, session, account }) {
      switch (trigger) {
        case "update":
          if (trigger === "update") token.name = session.user.name
          break
        case "signUp":
          await prisma.user.upsert({
            where: {
              email: token.email as string,
            },
            create: {
              email: token.email as string,
              name: token.name as string,
              image: token.picture as string,
            },
            update: {
              image: token.picture as string,
              name: token.name as string,
            }
          })
          break
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) { 
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  }
  // debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
