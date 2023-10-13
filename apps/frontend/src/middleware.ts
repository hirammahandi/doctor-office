// middleware.ts
import type { NextRequest } from "next/server";

const secretKey = process.env.JWT_SECRET;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // const token = request.cookies.get(TOKEN_NAME);
  // const response = NextResponse.next();
  // if (!token && request.url.includes(CLIENT_ROUTES.SIGNIN)) return response;
  // if (!token) {
  //   return NextResponse.redirect(new URL(CLIENT_ROUTES.SIGNIN, request.url));
  // }
  // if (token && request.url.includes(CLIENT_ROUTES.SIGNIN)) {
  //   return NextResponse.redirect(new URL(CLIENT_ROUTES.PROFILE, request.url));
  // }
  // try {
  //   const secret = new TextEncoder().encode(secretKey);
  //   await jwtVerify(token, secret);
  //   return response;
  // } catch (error) {
  //   return NextResponse.redirect(new URL(CLIENT_ROUTES.SIGNIN, request.url));
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/signin"],
};
