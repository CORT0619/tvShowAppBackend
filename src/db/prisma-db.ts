import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

// create a new user
export const createUser = async (
  userId: string,
  name: string,
  email: string,
  password: string,
  salt: string,
  role?: Role
) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        userId,
        name,
        email,
        password,
        salt,
        role
      }
    });
    console.log(newUser);
    return newUser;
  } catch (error) {
    throw new Error(
      'there was an error creating a new user' + JSON.stringify(error)
    );
  }
};

// add a new tvshow for user
export const addUserTvShow = async (userId: number, showId: number) => {
  try {
    return await prisma.userTvShow.create({
      data: {
        userId,
        tvShowId: showId
      },
      select: {
        tvShowId: true,
        userId: true
      }
    });
  } catch (err) {
    throw new Error(
      'an error occurred adding a new user tvshow. ' + JSON.stringify(err)
    );
  }
};

// search for user - login
export const findUser = async (
  email: string,
  opt?: {
    password?: boolean;
    salt?: boolean;
    role?: boolean;
    tvshow?: boolean;
    episodes?: boolean;
  }
) => {
  const {
    password = false,
    salt = false,
    role = false,
    tvshow = false,
    episodes = false
  } = opt || {};
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        userId: true,
        salt,
        password,
        role,
        tvshow,
        episodes
      }
    });

    return user;
  } catch (err) {
    throw new Error(
      'there was an error finding the user. ' + JSON.stringify(err)
    );
  }
};

// upload a user image
export const uploadImage = async (userId: string, photo: string) => {
  try {
    return await prisma.user.update({
      where: {
        userId
      },
      data: {
        photo
      },
      select: {
        userId: true,
        photo: true,
        id: true
      }
    });
  } catch (error) {
    throw new Error(
      'there was an error uploading a photo ' + JSON.stringify(error)
    );
  }
};

// mark a tvshow episode as watched
export const markEpisode = async (
  userId: number,
  episodeId: number,
  watched = true
) => {
  try {
    return await prisma.userEpisodes.create({
      data: {
        userId,
        episodeId,
        watched
      },
      select: {
        userId: true,
        episodeId: true,
        watched: true
      }
    });
  } catch (error) {
    throw new Error(
      'there was an error marking a user episode ' + JSON.stringify(error)
    );
  }
};
