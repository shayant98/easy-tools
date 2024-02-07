import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "../../../env/server.mjs";
import { createTRPCContext } from "../../../server/api/trpc";
import { appRouter } from "../../../server/api/root";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.ENVIRONMENT === "dev"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error.stack?.toString()}`);
        }
      : undefined,
});
