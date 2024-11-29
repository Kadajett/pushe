import type { DefaultSession, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "@/types/user";

// Temporary test user until database is set up
const TEST_USER: User = {
  id: "test-uuid",
  email: "test@example.com",
  name: "Test User",
  username: "testuser",
  emailVerified: null,
  image: null,
  profilePictureUrl: "",
  accountCreationDate: new Date(),
};

async function authenticateUser(email: string, password: string): Promise<User | null> {
  // Temporary authentication logic
  if (email === TEST_USER.email && password === "password") {
    return TEST_USER;
  }
  return null;
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // @ts-expect-error: TODO: fix this
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          return await authenticateUser(credentials.email, credentials.password);
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
} satisfies NextAuthConfig;
