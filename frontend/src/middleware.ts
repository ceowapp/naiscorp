import { NextResponse } from "next/server";

export default function middleware(req, evt) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
