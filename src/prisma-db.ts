import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient()

// create a new user
export const createUser = async (userId: string, name: string, email: string, password: string, role?: Role) => {
	try {
		const newUser = await prisma.user.create({
			data: {
				userId,
				name,
				email,
				password,
				role
			}
		});
	} catch (error) {
		throw new Error(JSON.stringify(error));
	}
};

// add a new tvshow

// search for user

// insert a new tvshow