import { type User, type Prisma } from "@prisma/client";
import { prisma } from "../db";

export const createUser = async (input: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: input,
  });
};

export const findUser = async (
  where: Partial<Prisma.UserCreateInput>,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findFirst({
    where,
    select,
  })) as User;
};

export const findUniqueUser = async (
  where: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findUnique({
    where,
    select,
  })) as User;
};


