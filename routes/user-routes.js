const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

/* Account Registration */
userRouter.post('/register', (req, res, err) => {
	const { name, username, password } = req.body;
});


/* Upload user photo */
userRouter.post('/photo-upload', upload.single('likeness'), async (req, res, next) => {
	// TODO: utlize s3 sdk for photo uploads
	console.log('req ', req);
});


/* Login */
userRouter.post('/login', async (req, res, next) => {
	const { username, password } = req.body;
});


/* Logout */
userRouter.post('/logout', async (req, res, next) => {});

module.exports = userRouter;