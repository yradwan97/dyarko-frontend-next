export {default} from "next-auth/middleware"

export const config = { 
    matcher:  ['/categories', '/videos/:path*', '/application/:path*', '/property-details/:path*']
}
// TODO:
// "/user"