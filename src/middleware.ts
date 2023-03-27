// import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
// import { env } from "./env/server.mjs";
// import { withClerkMiddleware } from "@clerk/nextjs/server";

// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.cachedFixedWindow(4, "1 d"),
//   ephemeralCache: new Map(),
//   analytics: true,
// });

// async function middleware(request: NextRequest, event: NextFetchEvent): Promise<Response | undefined> {
//   const ip = request.ip ?? "127.0.0.1";

//   const { success, pending, limit, reset, remaining } = await ratelimit.limit(`ratelimit_middleware_${ip}`);
//   event.waitUntil(pending);

//   const res = success ? NextResponse.next() : NextResponse.redirect(new URL("/api/blocked", request.url));

//   res.headers.set("X-RateLimit-Limit", limit.toString());
//   res.headers.set("X-RateLimit-Remaining", remaining.toString());
//   res.headers.set("X-RateLimit-Reset", reset.toString());
//   return res;
// }

// export default withClerkMiddleware((req: NextRequest, event: NextFetchEvent) => {
//   return middleware(req, event);
//   // return NextResponse.next();
// });

// export const config = {
//   matcher: "/api/trpc/ai.:path*",
// };

import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withClerkMiddleware((_req: NextRequest) => {
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
  ],
};
