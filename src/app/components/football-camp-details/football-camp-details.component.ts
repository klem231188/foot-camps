import {Component, OnInit} from "@angular/core";
import {FootballCamp} from "../../services/football-camp/football-camp";
import {FootballCampService} from "../../services/football-camp/football-camp.service";
import {ActivatedRoute, Params} from "@angular/router";
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'football-camp-details',
  templateUrl: 'football-camp-details.component.html',
  styleUrls: ['football-camp-details.component.scss']
})
export class FootballCampDetailsComponent implements OnInit {

  private footballCamp: FootballCamp = null;

  constructor(private route: ActivatedRoute,
              private footballCampService: FootballCampService,
              private mdIconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer) {
    mdIconRegistry.addSvgIcon('ball', sanitizer.bypassSecurityTrustResourceUrl('assets/img/ball.svg'));
  }


  ngOnInit(): void {
    this.route
      .params
      .switchMap((params: Params) => {
        return this.footballCampService.getFootballCamp(+params['id'])
      })
      .subscribe((footballCamp: FootballCamp) => {
        this.footballCamp = footballCamp
      });
  }
}
