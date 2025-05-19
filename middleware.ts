import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/app/lib/auth';

export default async function middleware(request: NextRequest) {
    const session = await auth();
    const pathName = request.nextUrl.pathname;

    // // 1. Prima gestiamo le route che non richiedono autenticazione
    // if (pathName === '/login' && !session) {
    //     return NextResponse.next();
    // }
    //
    // // 2. Poi le richieste speciali (es. DELETE)
    // if (request.method === 'DELETE' && pathName === '/space-cleanup') {
    //     return NextResponse.next();
    // }
    //
    // const user = session?.user;
    //
    // // 3. Controllo admin
    // if (user?.name === "admin" && pathName !== '/admin') {
    //     return NextResponse.redirect(new URL('/admin', request.url));
    // }
    //
    // // 4. Se già loggato e cerca di accedere a /login
    // if (session && pathName === '/login') {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }
    //
    // // 5. Protezione generale delle route
    // if (!session) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};