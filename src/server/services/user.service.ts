import { type Prisma } from '@prisma/client';
import { prisma } from '../db';

export const createUser = async (input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: input,
  }));
};