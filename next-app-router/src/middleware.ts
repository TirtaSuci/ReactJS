import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const isLogin = false;
    if (!isLogin) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: '/about/:path*',
}