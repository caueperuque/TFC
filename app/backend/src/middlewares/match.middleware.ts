import { NextFunction, Request, Response } from 'express';

class ValidateMatch {
  public static validateMatch(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    // console.log(homeTeam, awayTeam);

    if (homeTeamId === awayTeamId) {
      return res
        .status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    next();
  }
}

export default ValidateMatch;
