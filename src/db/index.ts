import { Role } from '@prisma/client';
import {
  addUserTvShow,
  createUser,
  findUser,
  markEpisode,
  uploadImage
} from './prisma-db';

export const registerUser = async (
  userId: string,
  name: string,
  email: string,
  password: string,
  hash: string,
  role?: Role
) => {
  try {
    return await createUser(userId, name, email, password, hash, role);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const addShowToUser = async (userId: number, showId: number) => {
  try {
    return await addUserTvShow(userId, showId);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const locateUser = async (
  email: string,
  opt?: {
    password?: boolean;
    hash?: boolean;
    role?: boolean;
    tvshow?: boolean;
    episodes?: boolean;
  }
) => {
  try {
    return await findUser(email, opt);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const addUserImage = async (userId: string, url: string) => {
  try {
    return await uploadImage(userId, url);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const addMarkedEpisode = async (
  userId: number,
  episodeId: number,
  watched = true
) => {
  try {
    return await markEpisode(userId, episodeId, watched);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

/**
 * cache
 */

// TODO: add a tvshow to the cache - MOVE

// TODO: add popular tv shows to cache - MOVE
