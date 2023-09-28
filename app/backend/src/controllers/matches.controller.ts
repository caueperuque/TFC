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
}

export default MatchesController;
