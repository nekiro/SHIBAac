import { accounts, Prisma } from "@prisma/client";
import prisma from "../prisma";
import { sha1Encrypt } from "../lib/crypt";

export const getAccountByIdIncludeDefault: Prisma.accountsInclude = {
	players: { select: { id: true, name: true, level: true, vocation: true } },
};

export const getAccountById = async (accountId: number, include: Prisma.accountsInclude | null | undefined = getAccountByIdIncludeDefault) => {
	try {
		const account = await prisma.accounts.findFirst({
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

export const getAccountByName = async (accountName: string, include?: Prisma.accountsInclude) => {
	try {
		const account = await prisma.accounts.findFirst({
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

export const getAccountBy = async (where?: Prisma.accountsWhereInput, select?: Prisma.accountsSelect) => {
	try {
		const account = await prisma.accounts.findFirst({
			where,
			select,
		});

		return account;
	} catch (err) {
		return null;
	}
};

export const createAccount = async (name: string, password: string, email: string) => {
	const timestampInSeconds = Math.floor(Date.now() / 1000);

	try {
		const account = await prisma.accounts.create({
			data: {
				name,
				password: await sha1Encrypt(password),
				email,
				twoFAEnabled: false,
				creation: timestampInSeconds,
			},
		});

		return account;
	} catch (err) {
		return null;
	}
};

export const updateAccount = async () => {};

export const createCharacter = async () => {};
