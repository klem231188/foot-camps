import {Injectable} from '@angular/core';
import {FootballCamp} from './football-camp';
import {FOOTBAL_CAMPS} from './football-camps-mock';

@Injectable()
export class FootballCampService {

  getFootballCamps(): Promise<FootballCamp[]> {
    return Promise.resolve(FOOTBAL_CAMPS);
  }

  getFootballCamp(id: number): Promise<FootballCamp> {
    return this.getFootballCamps().then(footballCamps => {
      return footballCamps[id];
    });
  }
}
