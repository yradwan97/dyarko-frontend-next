export {default} from "next-auth/middleware"

export const config = { 
    matcher:  [
        '/categories', 
        '/login/confirm', 
        '/user', 
        '/videos/:path*', 
        '/application/:path*', 
        '/property-details/:path*'
    ]
}