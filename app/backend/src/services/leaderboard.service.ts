import { IServiceResponse } from '../Interfaces/IServiceResponse';
import Classification from '../entities/Classification';
import TeamModel from '../database/models/TeamsModel';

class LeaderboardService {
  private teamModel = TeamModel;

  public async getHomeOrAway(path: string): Promise<IServiceResponse<TeamModel>> {
    const data = await this.teamModel.findAll({
      include: [{ association: `${path}Match`, where: { inProgress: false } }],
    });

    const matchData = data.map((team) => new Classification(team.toJSON()));

    matchData
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);

    return { status: 'SUCCESSFUL', data: matchData };
  }
}

export default LeaderboardService;
