import NextAuth, { AuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { User } from '@/models/User';
import { connectToDatabase } from '@/lib/mongoose';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          throw new Error('Usuário não encontrado');
        }

        const isValid = await compare(credentials!.password, user.password);

        if (!isValid) {
          throw new Error('Senha inválida');
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    })
  ],
  session: {
    strategy: 'jwt' satisfies SessionStrategy
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
