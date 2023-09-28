import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginMiddleware from '../middlewares/login.middleware';
import middleware from '../middlewares/auth.middleware';

const router = Router();

const loginController = new LoginController();

router.post('/', loginMiddleware.validateLogin, (req, res) => loginController.login(req, res));
router.get(
  '/role',
  middleware.validateToken,
  (req, res) => LoginController.getRoleUser(req, res),
);

export default router;
