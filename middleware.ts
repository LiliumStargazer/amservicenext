import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/app/lib/auth/auth';



// const protectedRouters = ['/', '/admin'];

export default async function middleware(request: NextRequest) {
    const session = await auth();
    const pathName = request.nextUrl.pathname;



    // Bypass session check for POST requests to /space-cleanup
    if (request.method === 'DELETE' && pathName === '/space-cleanup') {
        return NextResponse.next();
    }

    const user = session?.user;
    console.log('user:', user);

    return NextResponse.next();

    //
    // // Se l'utente è admin e la rotta è protetta, reindirizza ad /admin
    // if (user?.name === "admin" && pathName !== '/admin') {
    //     return NextResponse.redirect(new URL('/admin', request.url));
    // }
    //
    // // Se l'utente non è admin e cerca di accedere a /admin, reindirizza alla pagina principale
    // if (user && user.name !== "admin" && pathName === '/admin') {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }
    //
    // // Se l'utente è loggato e cerca di accedere a /login, reindirizza alla pagina principale
    // if (session && pathName === '/login') {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }
    //
    // // Se la rotta è protetta e non c'è sessione, reindirizza al login
    // if (!session && pathName !== '/login') {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};