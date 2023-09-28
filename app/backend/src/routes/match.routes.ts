import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import middleware from '../middlewares/auth.middleware';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  middleware.validateToken,
  (req, res) => matchesController.finishMatch(req, res),
);

export default router;
