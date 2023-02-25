/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type IRegister } from "~/schema/user.schema";
import { hash} from "argon2";
import { TRPCError } from "@trpc/server";
import { createUser } from "../services/user.service";

export const registerHandler = async ({
  input,
}: {
  input: IRegister;
}) => {
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