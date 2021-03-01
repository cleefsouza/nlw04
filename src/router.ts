import { Router } from 'express';
import { AnswerController } from './controllers/AnswerConstroller';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post('/user', userController.create);

router.post('/survey', surveyController.create);
router.get('/surveys', surveyController.show);

router.post('/send-mail', sendMailController.execute);

router.get('/answer/:value', answerController.execute);

router.get("/nps/:survey", npsController.execute);

export { router };
