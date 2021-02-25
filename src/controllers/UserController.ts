import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {
	async create(req: Request, res: Response) {
		const { name, email } = req.body;

		const userRepository = getCustomRepository(UserRepository);

		const userExists = await userRepository.findOne({ email });

		if (userExists) {
			return res.status(400).json({ error: 'user already exists!' });
		}

		const user = userRepository.create({ name, email });

		await userRepository.save(user);

		return res.status(201).json(user);
	}
}

export { UserController };
