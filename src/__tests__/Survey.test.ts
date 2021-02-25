import request from 'supertest';

import { app } from '../app';
import createConnection from '../database';

describe('Survey', () => {
	beforeAll(async () => {
		const conn = await createConnection();
		await conn.runMigrations();
	});

	it('Should be able to create a new survey', async () => {
		const res = await request(app).post('/survey').send({
			title: 'Title Example 1',
			description: 'Description Example 1',
		});

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('id');
	});

	it('Should be able to get all surveys', async () => {
		await request(app).post('/survey').send({
			title: 'Title Example 2',
			description: 'Description Example 2',
		});

		const res = await request(app).get('/surveys');

		expect(res.body.length).toBe(2);
	});
});
