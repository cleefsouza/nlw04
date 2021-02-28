import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';

import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
	async execute(req: Request, res: Response) {
		const { email, survey_id } = req.body;

		const userRepository = getCustomRepository(UserRepository);
		const surveyRepository = getCustomRepository(SurveyRepository);
		const surveyUserRepository = getCustomRepository(SurveyUserRepository);

		const user = await userRepository.findOne({ email });

		if (!user) {
			return res.status(404).json({
				error: 'User does not exists!',
			});
		}

		const survey = await surveyRepository.findOne({ id: survey_id });

		if (!survey) {
			return res.status(404).json({
				error: 'Survey does not exists!',
			});
		}

		const surveyUserExists = await surveyUserRepository.findOne({
			where: [{ user_id: user.id }, { value: null }],
			relations: ['user', 'survey']
		});

		const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
		const variables = {
			name: user.name,
			title: survey.title,
			description: survey.description,
			user_id: user.id,
			link: process.env.URL_MAIL,
		};

		if (surveyUserExists) {
			await SendMailService.execute(email, survey.title, variables, npsPath);

			return res.status(200).json(surveyUserExists);
		}

		const surveyUser = surveyUserRepository.create({
			user_id: user.id,
			survey_id,
		});

		await surveyUserRepository.save(surveyUser);

		await SendMailService.execute(email, survey.title, variables, npsPath);

		return res.status(201).json(surveyUser);
	}
}

export { SendMailController };
