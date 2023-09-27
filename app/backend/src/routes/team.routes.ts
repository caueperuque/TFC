import { Router } from 'express';
// import TeamService from '../services/teams.service';
import TeamController from '../controllers/teams.controller';
// import TeamModel from '../database/models/TeamsModel';

const teamController = new TeamController();

const router = Router();

router.get('/', (req, res) => teamController.getAll(req, res));
router.get('/:id', (req, res) => teamController.getById(req, res));

export default router;
