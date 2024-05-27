import NextAuth from 'next-auth'
import { options } from '../../../../options'
// import Providers from 'next-auth/providers'

const handler = NextAuth(options)

export {handler as GET, handler as POST}