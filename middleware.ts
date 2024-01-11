export {default} from "next-auth/middleware"

export const config = { 
    matcher:  ['/user', '/categories', '/videos/:path*', '/application/:path*', '/property-details/:path*']
}