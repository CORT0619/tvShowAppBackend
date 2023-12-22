import express, { Handler, Request, Response } from 'express';
import * as logger from '../logger';
import userRouter from './user-routes';
import showRouter from './show-routes';

// const router = express.Router();
const app = express();

// TODO: add these back
// router.use('/users', userRouter);
app.use('/api/shows', showRouter);

app.use(errorHandler);

function errorHandler(err: Error, req: Request, res: Response, next: Handler) {
	console.log('err ', err);
	res.status(500);
	// log errors here
	logger.default.log('high', err); // TODO: verify log level
}

export default app;
