export {default} from "next-auth/middleware"

export const config = { 
    matcher:  [
        '/user', 
        // '/categories', 
        // '/login/confirm', 
        // '/videos/:path*', 
        // '/application/:path*', 
        // '/property-details/:path*',
        // '/login/confirm',
        // '/payment/:path*'
    ]
}