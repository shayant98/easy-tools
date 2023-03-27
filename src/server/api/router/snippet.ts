import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const snippetRouter = createTRPCRouter({
  getAllSnippetsByUser: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    const user = ctx.auth.userId;

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "You must be logged in to view your snippets." });
    }

    try {
      const snippets = await prisma.snippet.findMany({
        where: {
          authorId: user,
        },
      });

      return snippets;
    } catch (error) {
      console.log(error);

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "An error occurred while fetching your snippets." });
    }
  }),

  saveSnippet: publicProcedure.input(z.object({ content: z.string(), title: z.string(), language: z.string(), desc: z.string().optional() })).mutation(async ({ input, ctx }) => {
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
          language: input.language,
          description: input.desc,
        },
      });

      return snippet;
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "An error occurred while saving your snippet." });
    }
  }),
  deleteSnippet: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
    const { prisma } = ctx;

    const user = ctx.auth.userId;

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "You must be logged in to delete a snippet." });
    }

    try {
      const snippet = await prisma.snippet.delete({
        where: {
          id: input.id,
        },
      });

      return snippet;
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "An error occurred while deleting your snippet." });
    }
  }),
  updateSnippet: publicProcedure
    .input(z.object({ id: z.number(), content: z.string(), title: z.string(), language: z.string(), desc: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx;

      const user = ctx.auth.userId;

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "You must be logged in to update a snippet." });
      }

      try {
        const snippet = await prisma.snippet.update({
          where: {
            id: input.id,
          },
          data: {
            content: input.content,
            title: input.title,
            language: input.language,
            description: input.desc,
          },
        });

        return snippet;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "An error occurred while updating your snippet." });
      }
    }),
});
