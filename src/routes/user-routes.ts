import express, { RequestHandler } from 'express';
// import multer from 'multer';
import { body } from 'express-validator';
import 'dotenv/config';
import * as user from '../user';
import { /*Login,*/ User } from '../models/user';
import * as db from '../db';
import { ErrorWithStatusCode } from '../models/errorwithstatuscode';

const userRouter = express.Router();
// const upload = multer({ dest: './public/uploads/' });

/* Account Registration */
userRouter.post(
  '/register',
  body('email').isEmail().notEmpty().trim().escape(),
  body('name').isString().notEmpty().trim().escape(),
  body('password').notEmpty().isString(),
  (async (req, res, next) => {
    const { name, email, password } = req.body as User;

    try {
      const userFound = await db.locateUser(email);

      // no user found
      if (userFound && Object.values(userFound).length > 0) {
        throw new ErrorWithStatusCode(
          400,
          'this email address already exists.'
        );
      }

      const userId = user.generateId();

      const hashedPassword = await user.hashPassword(password);

      const newUser = await db.registerUser(
        userId,
        name,
        email,
        hashedPassword.hashed,
        hashedPassword.salt
      );
      console.log({ newUser });

      return res.status(200).json('User created successfully!');
    } catch (err) {
      next(err);
    }
  }) as RequestHandler
);

/* Upload user photo */
/*userRouter.post(
	'/photo-upload',
	upload.single('likeness'),
	async (req, res, next) => {
	// TODO: utlize s3 sdk for photo uploads
	console.log('req ', req);

	try {

	} catch (err) {
		next(err);
	}
});*/

/* Login */
// userRouter.post(
// TODO: work in refresh token
//   '/login',
//   body('email').isEmail().notEmpty().trim().escape(),
//   body('password').notEmpty().isString(),
//   (async (req, res, next) => {
//     const { email, password } = req.body as Login;

//     try {
//       const userFound = await db.locateUser(email, {
//         password: true,
//         role: true
//       });

//       console.log({ userFound });
//       if (userFound && Object.keys(userFound).length > 0) {
//         const dbPassword = userFound.password;

//         // compare passwords
//         const isValidPassword = await user.verifyPassword(password, dbPassword);

//         if (!isValidPassword) {
//           return res
//             .status(404)
//             .json({ error: 'Incorrect username or password.' }); // TODO: make error message more specific?
//         }
//         // TODO: need to look into refresh token
//         const token = user.signToken(userFound.role, userFound.userId);
//         return res
//           .cookie('access_token', `Bearer ${token}`, {
//             httpOnly: true,
//             expires: new Date(/* 10 minutes*/)
//           }) // TODO: set expiry to 10 mins
//           .status(201)
//           .json({ message: 'login successful!' });
//       }
//       return res
//         .status(404)
//         .json({ message: 'Incorrect username or password.' }); // TODO: make error message more specific?
//     } catch (err) {
//       next(err);
//     }
//   }) as RequestHandler
// );

/* Logout */
// userRouter.post('/logout', async (req, res, next) => {});

export default userRouter;
