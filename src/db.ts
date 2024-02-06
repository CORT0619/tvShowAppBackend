import { Role } from '@prisma/client';
import { createUser } from './prisma-db';

export const registerUser = async (name: string, email: string, password: string, role?: Role) => {
	await createUser(name, email, password, role)
}

/**
 * cache
*/ 

// TODO: need to store show info, including imdb id (within externals) in db
// TODO: need to store user's favorite data in db
// TODO: need to store episode's they've viewed
// TODO: how to cache