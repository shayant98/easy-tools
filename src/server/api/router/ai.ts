import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const aiRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ query: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.query}`,
    };
  }),
});
