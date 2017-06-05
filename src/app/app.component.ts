import {Component, OnInit} from "@angular/core";
import {FootballCampService} from "./football-camp/football-camp.service";
import {FootballCamp} from "./football-camp/football-camp";

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
