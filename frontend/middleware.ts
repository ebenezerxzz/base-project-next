import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth.token')?.value;

    const isAuth = !!token;
    const isLoginPath = request.nextUrl.pathname === "/index";

    if(isAuth && isLoginPath){
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/index:path']
}