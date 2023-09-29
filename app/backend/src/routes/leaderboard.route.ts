import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
// import Classification from '../entities/Classification';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.getHomeOrAway(req, res));
router.get('/away', (req, res) => leaderboardController.getHomeOrAway(req, res));

export default router;
