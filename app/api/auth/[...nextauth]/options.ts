import { noAuthAxios } from "@/app/services/axiosClient";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 15 
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name:'credentials',
            credentials: {
                email: {},
                password: {},
                role: {}
            },
            async authorize(credentials) {
            
            try {
                const response = await noAuthAxios.post("/login", {
                    email: credentials?.email,
                    password: credentials?.password,
                    role: credentials?.role,
                  });        
                
                if (response.status === 200 && response.data) {
                    return response.data
                }
            } catch (e) { 
                console.error(e)
            }
                return null
            }
        })
    ],
    pages: {
        signIn: "/login",
        newUser: "/new-user"    
    },
    callbacks: {
        
        async jwt({token, user, session}) {
            
            if (user) {
                return {
                    ...token,
                    //@ts-ignore
                    user: {
                        ...user,
                        data: {
                            //@ts-ignore
                            ...user.data
                        }
                    }
                }
            }
            return token
        },
        async session({session, token, user}) {
            
            return {
                ...session,
                user: {
                    ...session.user,
                    //@ts-ignore
                    accessToken: token.user.accessToken,
                    //@ts-ignore
                    refreshToken: token.user.refreshToken,
                    //@ts-ignore
                    ...token.user.data
                }
            }
        }
    }
}