import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authConfig: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString() || "";
        const password = credentials?.password?.toString() || "";
        // DEV-ONLY: accept a demo user. Replace with real verification later.
        if (email && password && password.length >= 4) {
          return { id: email, email, name: email.split("@")[0] } as any;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Placeholder role. Swap with DB role later.
        (token as any).role = (token as any).role || "student";
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).role = (token as any).role || "student";
      return session;
    },
  },
};


