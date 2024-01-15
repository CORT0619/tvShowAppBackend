import express, { NextFunction, Request, Response } from 'express';import logger from '../logger';
import userRouter from './user-routes';
import showRouter from './show-routes';
import { AxiosError } from 'axios';

const app = express();

app.use('/api/users', userRouter);
app.use('/api/shows', showRouter);

app.use(errorHandler);

function errorHandler(err: AxiosError, req: Request, res: Response, next: NextFunction) {
	// console.log('error handler ', err.toJSON());
	if (err) {
		logger.log('error', err);
		const code = parseInt(err.code);
		if (code >= 400 && code < 500) {

			return res.status(code).send("There was an error with the request.");
		}

		if (code >= 500) {
			return res.status(code).send("There was an error on the server.");
		}

		return res.status(code).send('An error has occurred.');
	}
}

export default app;
