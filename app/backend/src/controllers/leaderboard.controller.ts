import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  private leaderboardService = new LeaderboardService();

  public async getHomeOrAway(req: Request, res: Response) {
    const { path } = req.route;
    const pathData = path.split('/').pop();

    const leaderboardData = await this.leaderboardService.getHomeOrAway(pathData);

    return res.status(200).json(leaderboardData.data);
  }
}

export default LeaderboardController;
