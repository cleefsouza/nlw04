import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import createConnection from './database';
import { AppError } from './errors/AppError';
import { router } from './router';

createConnection();

const app = express();

app.use(express.json());
app.use(router);

app.use((erro: Error, req: Request, res: Response, _next: NextFunction) => {
	if (erro instanceof AppError) {
		return res.status(erro.status).json({
			message: erro.message,
		});
	}

	return res.status(500).json({
		status: 'Error',
		message: `Internal server error ${erro.message}`,
	});
});

export { app };
