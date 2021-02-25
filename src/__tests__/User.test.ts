import request from 'supertest';

import { app } from '../app';
import createConnection from '../database';

describe('User', () => {
	beforeAll(async () => {
		const conn = await createConnection();
		await conn.runMigrations();
	});

	it('Should be able to create a new user', async () => {
		const res = await request(app).post('/user').send({
			name: 'User Example',
			email: 'user@example.com',
		});

		expect(res.status).toBe(201);
	});

    it('Should not be able to create a user with exists email', async () => {
		const res = await request(app).post('/user').send({
			name: 'User Example',
			email: 'user@example.com',
		});

		expect(res.status).toBe(400);
	});
});
