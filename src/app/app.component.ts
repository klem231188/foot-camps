import {Component} from "@angular/core";
import {FootballCampService} from "./services/football-camp/football-camp.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [FootballCampService]
})
export class AppComponent {
  constructor(private footballCampService: FootballCampService) {
  }
}
