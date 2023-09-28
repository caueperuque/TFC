import { IServiceResponse } from '../Interfaces/IServiceResponse';
import MatchesModel from '../database/models/MatchesModel';

class MatchesService {
  private matchesModel = MatchesModel;

  public async getAllMatches(): Promise<IServiceResponse<MatchesModel>> {
    const match = await this.matchesModel.findAll({
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return { status: 'SUCCESSFUL', data: match };
  }
}

export default MatchesService;
