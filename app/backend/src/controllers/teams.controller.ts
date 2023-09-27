import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

class TeamController {
  private teamsService: TeamService = new TeamService();

  public async getAll(_req: Request, res: Response) {
    const teams = await this.teamsService.getAll();

    if (!teams) {
      return res.status(404).json({ message: 'Teams not found' });
    }

    return res.status(200).json(teams.data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const team = await this.teamsService.getById(Number(id));

    if (!team.data) return res.status(404).end();

    return res.status(200).json(team.data);
  }
}

export default TeamController;
