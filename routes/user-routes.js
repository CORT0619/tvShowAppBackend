const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

/* Account Registration */
userRouter.post('/register', (req, res, err) => {});


/* Upload user photo */
userRouter.post('/photo-upload', upload.single('likeness'), async (req, res, next) => {
	// TODO: utlize s3 sdk for photo uploads
	console.log('req ', req);
});


/* Login */
userRouter.post('/login', async (req, res, next) => {});


/* Logout */
userRouter.post('/logout', async (req, res, next) => {});

module.exports = userRouter;