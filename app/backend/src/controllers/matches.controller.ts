import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  private matchesService: MatchesService = new MatchesService();

  public async getAllMatches(_req: Request, res: Response) {
    const matches = await this.matchesService.getAllMatches();

    return res.status(200).json(matches.data);
  }
}

export default MatchesController;
