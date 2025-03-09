import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth as firebaseAuth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            credentials.email,
            credentials.password
          );
          
          const user = userCredential.user;
          
          if (user) {
            return {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              image: user.photoURL
            };
          }
          
          return null;
        } catch (error) {
          console.error("Error during sign in:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret-for-development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 