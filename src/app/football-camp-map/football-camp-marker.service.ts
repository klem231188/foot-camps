import {Injectable} from "@angular/core";
import {FOOTBAL_CAMP_MARKERS} from "./football-camp-markers-mock";
import {FootballCampMarker} from "./football-camp-marker";

@Injectable()
export class FootballCampMarkerService {

  getFootballCampMarkers():  Promise<FootballCampMarker[]> {
    return Promise.resolve(FOOTBAL_CAMP_MARKERS);
  }

}
