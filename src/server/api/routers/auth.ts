import { RegisterSchema } from "~/schema/user.schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { registerHandler } from "~/server/controllers/auth.controller";

export const authRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(RegisterSchema)
    .mutation(({ input }) => registerHandler({ input })),
});
