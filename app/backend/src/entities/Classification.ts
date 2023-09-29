import { ICreateMatch } from '../Interfaces/ICreateMatch';
import TeamModel from '../database/models/TeamsModel';

interface Match extends ICreateMatch {
  id: number;
  inProgress: boolean;
}

type LeaderBoardTeam<T> = {
  id: number;
  teamName: string;
  homeMatch?: T[];
  awayMatch?: T[];
};

class Classification {
  public name: string;
  public totalPoints = 0;
  public totalGames = 0;
  public totalVictories = 0;
  public totalDraws = 0;
  public totalLosses = 0;
  public goalsFavor = 0;
  public goalsOwn = 0;
  public goalsBalance = 0;
  public efficiency = 0;

  constructor(data: TeamModel) {
    this.name = data.teamName;
    this.calculateResult(data);
    this.calculatePoint();
    this.calculateTotalGames();
    this.calculateTotalGD();
    this.calculateEfficiency();
  }

  private calculatePoint(): void {
    this.totalPoints = this.totalVictories * 3 + this.totalDraws;
  }

  private calculateTotalGames(): void {
    this.totalGames = this.totalDraws + this.totalLosses + this.totalVictories;
  }

  private winner(): void {
    this.totalVictories += 1;
  }

  private loser(): void {
    this.totalLosses += 1;
  }

  private draw(): void {
    this.totalDraws += 1;
  }

  private calculateEfficiency(): void {
    this.efficiency = Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }

  private calculateTotalGD(): void {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  private calculateResult(data: LeaderBoardTeam<Match>): void {
    const team = data.homeMatch ? 'home' : 'away';
    const opposingTeam = data.homeMatch ? 'away' : 'home';
    data[`${team}Match`]?.forEach((match) => {
      if (match[`${team}TeamGoals`] === match[`${opposingTeam}TeamGoals`]) {
        this.draw();
      }
      if (match[`${team}TeamGoals`] < match[`${opposingTeam}TeamGoals`]) {
        this.loser();
      }
      if (match[`${team}TeamGoals`] > match[`${opposingTeam}TeamGoals`]) {
        this.winner();
      }
      this.goalsFavor += match[`${team}TeamGoals`];
      this.goalsOwn += match[`${opposingTeam}TeamGoals`];
    });
  }

  public static mapMatchesData(awayData: Classification[], team: Classification) {
    const awayTeam = awayData.find((away) => away.name === team.name);
    if (!awayTeam) return team;
    const totalPoints = team.totalPoints + awayTeam.totalPoints;
    const totalGames = team.totalGames + awayTeam.totalGames;
    return {
      name: team.name,
      totalPoints,
      totalGames,
      totalVictories: team.totalVictories + awayTeam.totalVictories,
      totalDraws: team.totalDraws + awayTeam.totalDraws,
      totalLosses: team.totalLosses + awayTeam.totalLosses,
      goalsFavor: team.goalsFavor + awayTeam.goalsFavor,
      goalsOwn: team.goalsOwn + awayTeam.goalsOwn,
      totalGoalDifference: team.goalsBalance + awayTeam.goalsBalance,
      efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
    };
  }
}

export default Classification;
