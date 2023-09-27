import { IServiceResponse } from '../Interfaces/IServiceResponse';
import TeamModel from '../database/models/TeamsModel';

class TeamService {
  private teamModel = TeamModel;

  public async getAll(): Promise<IServiceResponse<TeamModel>> {
    const teams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getById(id: number): Promise<IServiceResponse<TeamModel>> {
    const team = await this.teamModel.findByPk(id);

    if (!team) return { status: 'NOT_FOUND' };

    return { status: 'SUCCESSFUL', data: team };
  }
}

export default TeamService;
