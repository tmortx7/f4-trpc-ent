/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ILogin, type IRegister } from "~/schema/user.schema";
import { hash, verify } from "argon2";
import { TRPCError } from "@trpc/server";
import {
  createUser,
  findUniqueUser,
  signTokens,
} from "../services/user.service";
import customConfig from "../config/default";
import { type Context } from "../api/trpc";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretkey } from "~/lib/auth";
import cookie from "cookie";
import redisClient from "~/utils/connectRedis";

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
  ctx,
}: {
  input: ILogin;
  ctx: Context;
}) => {
  try {
    const { res } = ctx;
    // Get the user from the collection
    const user = await findUniqueUser({ email: input.email });

    // Check if user exist and password is correct
    if (!user || !(await verify(user.password, input.password))) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email or password",
      });
    }
    const userId = user.id ?? "";
    void redisClient.set(userId, JSON.stringify(user));
    void redisClient.expire(userId, customConfig.redisCacheExpiresIn);

    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime(customConfig.accessTokenExpiresIn)
      .setSubject(user.id)
      .sign(new TextEncoder().encode(getJwtSecretkey()));

    // Send Access Token in Cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("user-token", token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      })
    );

    return {
      status: "success",
    };
  } catch (err: any) {
    throw err;
  }
};
