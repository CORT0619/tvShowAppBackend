import express, { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import userRouter from './user-routes';
import showRouter from './show-routes';
import { AxiosError } from 'axios';
// import cors from 'cors';

const app = express();

// app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/shows', showRouter);
app.use('*', (req, res) => {
  res.status(404).json({ error: 'route does not exist.' });
});

app.use(errorHandler);

function errorHandler(
  err: AxiosError,
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  // console.log('error handler ', err.toJSON());
  if (err) {
    logger.log('error', err);
    const code = parseInt(err.code);
    if (code >= 400 && code < 500) {
      const message = err.message || 'There was an error with the request.';
      return res.status(code).json({ error: message });
    }

    if (code >= 500) {
      const message = err?.message || 'There was an error on the server.';
      return res.status(code).json({ error: message });
    }

    return res.status(code).json({ error: 'An error has occurred.' });
  }
}

export default app;
