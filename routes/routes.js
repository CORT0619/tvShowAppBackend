const express = require('express');
const router = express.Router();
const userRouter = require('./user-routes');
const showRouter = require('./show-routes');


router.use('/users', userRouter);
router.use('/shows', showRouter);

router.use(errorHandler);

function errorHandler(err, req, res, next) {
	console.log('err ', err);
	res.status(500);
	// log errors here
}

module.exports = router;
