import express from 'express';
// import multer from 'multer';
// import { body } from 'express-validator';
// import * as user from './user';

const userRouter = express.Router();
// const upload = multer({ dest: './public/uploads/' });

/* Account Registration */
/*userRouter.post('/register', 
body('email').isEmail().trim().escape(),
// body('username').trim().escape(),
body('name').trim().escape(), async (req, res, next) => {
	const { name, email, password, isAdmin } = req.body;

	// const numOfSalts = process.env.salts;
	// const salt = await bcrypt.genSalt(numOfSalts);
	// const saltedPassword = await bcrypt.hash(password, salt);

	// TODO: store password in db
	// TODO: grab the password from the body
	// TODO: salt and encrypt it
	// TODO: make a call to store the password in the database
	try {
		user.signToken(isAdmin);
	} catch (err) {
		next(err);
	}
});*/


/* Upload user photo */
/*userRouter.post('/photo-upload', upload.single('likeness'), async (req, res, next) => {
	// TODO: utlize s3 sdk for photo uploads
	console.log('req ', req);

	try {

	} catch (err) {
		next(err);
	}
});*/


/* Login */
/*userRouter.post('/login',
body('username').trim().escape(), async (req, res, next) => {
	const { username, password } = req.body;
	// TODO: grab the password from the body
	// TODO: apply the salts, etc.
	// grab the password from the database and compare the passwords

});*/


/* Logout */
// userRouter.post('/logout', async (req, res, next) => {});

export default userRouter;