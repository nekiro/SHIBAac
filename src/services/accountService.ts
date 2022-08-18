import { account, Prisma } from '@prisma/client';
import prisma from '../prisma';
import { sha1Encrypt } from '../lib/crypt';

type Account = Promise<account | null>;

export const getAccountByIdIncludeDefault: Prisma.accountInclude = {
  players: { select: { name: true, level: true, vocation: true } },
};

export const getAccountById = async (
  accountId: number,
  include:
    | Prisma.accountInclude
    | null
    | undefined = getAccountByIdIncludeDefault
): Account => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        id: accountId,
      },
      include,
    });

    return account;
  } catch (err) {
    return null;
  }
};

export const getAccountByName = async (
  accountName: string,
  include?: Prisma.accountInclude
): Account => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        name: accountName,
      },
      include,
    });

    return account;
  } catch (err) {
    return null;
  }
};

export const getAccountBy = async (
  where?: Prisma.accountWhereInput,
  select?: Prisma.accountSelect
): Account => {
  try {
    const account = (await prisma.account.findFirst({
      where,
      select,
    })) as Account;

    return account;
  } catch (err) {
    return null;
  }
};

export const createAccount = async (
  name: string,
  password: string,
  email: string
): Account => {
  try {
    const account = await prisma.account.create({
      data: {
        name,
        password: await sha1Encrypt(password),
        email,
      },
    });

    return account;
  } catch (err) {
    return null;
  }
};

export const updateAccount = async () => {};

export const createCharacter = async () => {};