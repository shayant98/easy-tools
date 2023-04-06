import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "./env/server.mjs";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(4, "1 d"),
  ephemeralCache: new Map(),
  analytics: true,
});

import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextFetchEvent, NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withClerkMiddleware(async (_req: NextRequest, event: NextFetchEvent) => {
  const ip = _req.ip ?? "127.0.0.1";

  // Only run the middleware for api/trpc/ai
  if (_req.nextUrl.pathname.includes("api/trpc/ai")) {
    return NextResponse.next();
  }

  const { success, pending, limit, reset, remaining } = await ratelimit.limit(`ratelimit_middleware_${ip}`);
  event.waitUntil(pending);

  const res = success ? NextResponse.next() : NextResponse.redirect(new URL("/api/blocked", _req.url));

  res.headers.set("X-RateLimit-Limit", limit.toString());
  res.headers.set("X-RateLimit-Remaining", remaining.toString());
  res.headers.set("X-RateLimit-Reset", reset.toString());
  return res;
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
