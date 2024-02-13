import express, { RequestHandler } from 'express';
// import multer from 'multer';
import { body } from 'express-validator';
import 'dotenv/config';
import * as user from '../user';
import { /*Login,*/ User } from '../models/user';
import * as db from '../db';

const userRouter = express.Router();
// const upload = multer({ dest: './public/uploads/' });

/* Account Registration */
userRouter.post(
  '/register',
  body('email').isEmail().notEmpty().trim().escape(),
  body('name').isString().trim().escape(),
  body('password').notEmpty().isString(),
  (async (req, res, next) => {
    const { name, email, password } = req.body as User;

    // TODO: check db and make sure username doesn't exist
    // TODO: create user

    try {
      const userFound = await db.locateUser(email);
      console.log({ userFound });

      // no user found
      if (userFound && Object.keys(userFound).values.length > 0) {
        // TODO: test this
        // throw new Error('this email address already exists.');
        next(new Error('this email address already exists.'));
      }

      const userId = user.generateId();
      console.log('userId ', userId);

      const hashedPassword = user.hashPassword(password);
      console.log('hashed ', hashedPassword);

      const newUser = await db.registerUser(
        userId,
        name,
        email,
        (await hashedPassword).hashed,
        (await hashedPassword).salt
      );
      console.log({ newUser });

      return res.status(200).json('User created successfully!');
      // 	});
      // });
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
/*userRouter.post(
	'/login',
	body('email').isEmail().trim().escape(),
	body('password').isString(),
	async (req, res, next) => {
	const { email, password } = req.body as Login

	// TODO: SQL query - retrieve the email, password, hash from db
	// TODO: apply the hash to the retrieved password
	// TODO: compare the passwords

});
*/

/* Logout */
// userRouter.post('/logout', async (req, res, next) => {});

export default userRouter;
