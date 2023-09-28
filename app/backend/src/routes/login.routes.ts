import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginMiddleware from '../middlewares/login.middleware';

const router = Router();

const loginController = new LoginController();

router.post('/', loginMiddleware.validateLogin, (req, res) => loginController.login(req, res));

export default router;
