import {Component, OnInit} from "@angular/core";
import {FootballCampService} from "../football-camp/football-camp.service";
import {FootballCamp} from "../football-camp/football-camp";

@Component({
  selector: 'football-camp-locator',
  templateUrl: 'football-camp-locator.component.html'
})
export class FootballCampLocatorComponent implements OnInit {
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
