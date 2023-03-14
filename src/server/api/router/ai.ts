import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { Configuration, OpenAIApi } from "openai";
import { aiProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const aiRouter = createTRPCRouter({
  hello: aiProcedure.input(z.object({ query: z.string() })).query(async ({ input, ctx }) => {
    ctx.openai;

    try {
      const response = await ctx.openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Translate this natural language into SQL: \n\n "${input.query}" \n\n SQL Query:`,
        temperature: 0,
        max_tokens: 64,
        stop: "\n",
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        logprobs: 10,
      });

      console.log(response.data);

      return {
        data: response.data.choices[0]!.text,
      };
    } catch (error) {
      console.log(error);

      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
});
