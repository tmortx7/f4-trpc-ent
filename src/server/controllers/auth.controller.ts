/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ILogin, type IRegister } from "~/schema/user.schema";
import { hash, verify } from "argon2";
import { TRPCError } from "@trpc/server";
import { createUser, findUniqueUser } from "../services/user.service";
import { type Context } from "../api/trpc";

export const registerHandler = async ({ input }: { input: IRegister }) => {
  try {
    const hashedPassword = await hash(input.password);
    const user = await createUser({
      email: input.email,
      name: input.name,
      password: hashedPassword,
    });

    return {
      status: "success",
      data: {
        user,
      },
    };
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already exists",
      });
    }
    throw err;
  }
};

export const loginHandler = async ({
  input,
  ctx: {},
}: {
  input: ILogin;
  ctx: Context;
}) => {
  try {
    // Get the user from the collection
    const user = await findUniqueUser({ email: input.email });

    // Check if user exist and password is correct
    if (!user || !(await verify(user.password, input.password))) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email or password",
      });
    }

    return {
      status: "success",
    };
  } catch (err: any) {
    throw err;
  }
};
