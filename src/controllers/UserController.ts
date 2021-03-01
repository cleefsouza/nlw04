import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
	async create(req: Request, res: Response) {
		const { name, email } = req.body;

		const schema = yup.object().shape({
			name: yup.string().required(),
			email: yup.string().email().required(),
		});

		if (!(await schema.isValid(req.body, { abortEarly: true }))) {
			return res.status(400).json({ error: 'Validation falied!' });
		}

		// try {
		// 	await schema.validate(req.body, { abortEarly: true });
		// } catch(err) {
		// 	return res.status(400).json({ error: err });
		// }

		const userRepository = getCustomRepository(UserRepository);

		const userExists = await userRepository.findOne({ email });

		if (userExists) {
			throw new AppError('User already exists!', 400);
		}

		const user = userRepository.create({ name, email });

		await userRepository.save(user);

		return res.status(201).json(user);
	}
}

export { UserController };
