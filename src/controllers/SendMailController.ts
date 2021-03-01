import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';

import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';
import { AppError } from '../errors/AppError';

class SendMailController {
	async execute(req: Request, res: Response) {
		const { email, survey_id } = req.body;

		const userRepository = getCustomRepository(UserRepository);
		const surveyRepository = getCustomRepository(SurveyRepository);
		const surveyUserRepository = getCustomRepository(SurveyUserRepository);

		const user = await userRepository.findOne({ email });

		if (!user) {
			throw new AppError('User does not exists!', 404);
		}

		const survey = await surveyRepository.findOne({ id: survey_id });

		if (!survey) {
			throw new AppError('Survey does not exists!', 404);
		}

		const surveyUserExists = await surveyUserRepository.findOne({
			where: { user_id: user.id, value: null },
			relations: ['user', 'survey'],
		});

		const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
		const variables = {
			name: user.name,
			title: survey.title,
			description: survey.description,
			id: '',
			link: process.env.URL_MAIL,
		};

		if (surveyUserExists) {
			variables.id = surveyUserExists.id;
			await SendMailService.execute(email, survey.title, variables, npsPath);

			return res.status(200).json(surveyUserExists);
		}

		const surveyUser = surveyUserRepository.create({
			user_id: user.id,
			survey_id,
		});

		await surveyUserRepository.save(surveyUser);

		variables.id = surveyUser.id;
		await SendMailService.execute(email, survey.title, variables, npsPath);

		return res.status(201).json(surveyUser);
	}
}

export { SendMailController };
