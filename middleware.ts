import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
    // neu  nguoi dung login thi token se exist
    const token = await getToken({
        req: request,
        secret : process.env.NEXTAUTH_SECRET
    })

    const {pathname} = request.nextUrl

    //chap nhan req neu token exist hoac req cho nextauth session & provider hoac req toi '/_next/'

    if (token || pathname.includes('/api/auth') || pathname.includes('/_next')){
        if (pathname === '/login'){
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
    }
    // tra loi login neu user 0 co token va req protected routes

    if(!token && pathname !==   '/login'){
        return NextResponse.redirect(new URL('/login', request.url))
    }

return NextResponse.next()
}
