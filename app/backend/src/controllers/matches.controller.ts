import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  private matchesService: MatchesService = new MatchesService();

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (!inProgress) {
      const matches = await this.matchesService.getAllMatches();
      return res.status(200).json(matches.data);
    }

    return this.getAllMatchesByFilter(req, res);
  }

  public async getAllMatchesByFilter(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress !== 'true' && inProgress !== 'false') {
      return res.status(400).json({ message: 'Invalid query parameter' });
    }

    const response = JSON.parse(inProgress as string);
    const matches = await this.matchesService.getMatchesByFilter(response);

    return res.status(200).json(matches.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const match = await this.matchesService.finishMatch(Number(id));

    if (match.status === 'NOT_FOUND') {
      return res.status(400).json(
        { message: 'Match not found or already finished' },
      );
    }

    return res.status(200).json(match.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const match = await this.matchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

    if (match.status === 'NOT_FOUND') return res.status(404).json({ message: 'Match not found' });

    return res.status(200).json({
      message: `Match ${id} update for home team: ${homeTeamGoals} x away team: ${awayTeamGoals}`,
    });
  }
}

export default MatchesController;
