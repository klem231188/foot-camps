import {Component, OnInit} from "@angular/core";
import {FootballCampService} from "./football-camp/football-camp.service";
import {FootballCamp} from "./football-camp/football-camp";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [FootballCampService]
})
export class AppComponent implements OnInit {
  private footballCamp: FootballCamp = null;

  constructor(private footballCampService: FootballCampService) {
  }

  ngOnInit(): void {
    this.footballCampService.footballCampSelectedSource.asObservable().subscribe(
      footballCamp => {
        this.footballCamp = footballCamp;
      });
  }
}
