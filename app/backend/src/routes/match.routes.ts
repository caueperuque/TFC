import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import middleware from '../middlewares/index';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  middleware.authMiddleware.validateToken,
  (req, res) => matchesController.finishMatch(req, res),
);

router.patch(
  '/:id',
  middleware.authMiddleware.validateToken,
  (req, res) => matchesController.updateMatch(req, res),
);

router.post(
  '/',
  middleware.authMiddleware.validateToken,
  middleware.matchMiddleware.validateMatch,
  (req, res) => matchesController.createMatch(req, res),
);

export default router;
