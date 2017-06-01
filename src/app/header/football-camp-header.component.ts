import {Component, OnInit} from "@angular/core";
import {FootballCamp} from "../football-camp/football-camp";
import {FootballCampService} from "../football-camp/football-camp.service";

@Component({
  selector: 'football-camp-header',
  templateUrl: 'football-camp-header.component.html',
  styleUrls: ['football-camp-header.component.scss']
})
export class FootballCampHeaderComponent implements OnInit {

  private footballCamp: FootballCamp = null;

  constructor(private footballCampService: FootballCampService) {
  }

  ngOnInit(): void {
    this.footballCampService.footballCampSelectedSource.asObservable().subscribe(
      footballCamp => {
        this.footballCamp = footballCamp;
      });
  }

  onBackButtonClicked(): void {
    this.footballCampService.unSelectFootballCamp();
  }
}
