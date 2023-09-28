import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));

export default router;
