import {Injectable} from "@angular/core";
import {FootballCamp} from "./football-camp";
import {FOOTBAL_CAMPS} from "./football-camps-mock";
import {Subject} from "rxjs";

@Injectable()
export class FootballCampService {

  footballCampSelectedSource: Subject<FootballCamp> = new Subject<FootballCamp>();

  getFootballCamps(): Promise<FootballCamp[]> {
    return Promise.resolve(FOOTBAL_CAMPS);
  }

  selectFootballCamp(footballCampSelected: FootballCamp) {
    this.footballCampSelectedSource.next(footballCampSelected);
  }

  unSelectFootballCamp() {
    this.footballCampSelectedSource.next(null);
  }
}
