const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const upload = multer({ dest: './public/uploads/' });

/* Account Registration */
userRouter.post('/register', 
body('email').isEmail().trim().escape(),
body('username').trim().escape(),
body('name').trim().escape(), async (req, res, err) => {
	const { name, email, username, password } = req.body;

	const numOfSalts = 11;
	const salt = await bcrypt.genSalt(numOfSalts);
	const saltedPassword = await bcrypt.hash(password, salt);

	// TODO: store password in db
});


/* Upload user photo */
userRouter.post('/photo-upload', upload.single('likeness'), async (req, res, next) => {
	// TODO: utlize s3 sdk for photo uploads
	console.log('req ', req);
});


/* Login */
userRouter.post('/login',
body('username').trim().escape(), async (req, res, next) => {
	const { username, password } = req.body;
});


/* Logout */
userRouter.post('/logout', async (req, res, next) => {});

module.exports = userRouter;