import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const snippetRouter = createTRPCRouter({
  saveSnippet: publicProcedure.input(z.object({ content: z.string(), title: z.string() })).mutation(async ({ input, ctx }) => {
    const { prisma } = ctx;

    const user = ctx.auth.userId;

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "You must be logged in to save a snippet." });
    }

    try {
      const snippet = await prisma.snippet.create({
        data: {
          content: input.content,
          title: input.title,
          authorId: user,
        },
      });

      return snippet;
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "An error occurred while saving your snippet." });
    }
  }),
});
