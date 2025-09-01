import { NextResponse, NextRequest } from 'next/server'
import withAuth from './app/middlewares/withAuth';

// This function can be marked `async` if using `await` inside
export function mainMiddleware(request: NextRequest) {
    const res = NextResponse.next();
    return res;
}

export default withAuth(mainMiddleware, [`/dashboard`,`/profile`]); // tambahkan path yang butuh auth di array kedua