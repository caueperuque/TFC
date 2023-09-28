import { IFinish } from '../Interfaces/IFinish';
import { IServiceResponse } from '../Interfaces/IServiceResponse';
import MatchesModel from '../database/models/MatchesModel';

class MatchesService {
  private matchesModel = MatchesModel;

  public async getAllMatches(): Promise<IServiceResponse<MatchesModel>> {
    const matches = await this.matchesModel.findAll({
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getMatchesByFilter(inProgress: boolean): Promise<IServiceResponse<MatchesModel>> {
    const matches = await this.matchesModel.findAll({
      where: { inProgress },
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(id: number): Promise<IServiceResponse<IFinish>> {
    const match = await this.matchesModel.findOne({
      where: { id },
    });

    if (!match) {
      return { status: 'NOT_FOUND' };
    }

    await match.update({ inProgress: false });

    return { status: 'OK', data: { message: 'Finished' } };
  }
}

export default MatchesService;
