import { LoginSchema, RegisterSchema } from "~/schema/user.schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { loginHandler, registerHandler } from "~/server/controllers/auth.controller";

export const authRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(RegisterSchema)
    .mutation(({ input }) => registerHandler({ input })),

    loginUser: publicProcedure
    .input(LoginSchema)
    .mutation(({ input, ctx }) => loginHandler({ input, ctx })),
});
