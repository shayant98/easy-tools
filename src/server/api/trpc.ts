/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when
 * processing a request
 *
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

type CreateContextOptions = {
  auth: SignedInAuthObject | SignedOutAuthObject;
  prisma: PrismaClient;
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = ({ auth, prisma }: CreateContextOptions) => {
  return {
    auth,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: CreateNextContextOptions) => {
  // Get the session from the server using the unstable_getServerSession wrapper function

  return createInnerTRPCContext({ auth: getAuth(opts.req), prisma });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { type PrismaClient } from "@prisma/client";
import { prisma } from "../db";
import type { SignedInAuthObject, SignedOutAuthObject } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server";
const t = initTRPC.context<Awaited<ReturnType<typeof createTRPCContext>>>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Reusable middleware that configures OpenAI
 * procedure
 */
// const configureOpenAI = t.middleware(({ ctx, next }) => {
//   const configuration = new Configuration({
//     apiKey: env.OPENAI_KEY,
//   });

//   const openai = new OpenAIApi(configuration);

//   console.log(openai);

//   return next({
//     ctx: {
//       openai,
//     },
//   });
// });

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;
