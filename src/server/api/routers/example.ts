/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import redisClient from "~/utils/connectRedis";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  getHello: publicProcedure.query(async ({ctx}) => {
    const message = await redisClient.get("trpc");
    return { message };
  }),
});
