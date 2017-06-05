import {Component, OnInit} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";

@Component({
  selector: 'football-camp-header',
  templateUrl: 'football-camp-header.component.html',
  styleUrls: ['football-camp-header.component.scss']
})
export class FootballCampHeaderComponent implements OnInit {

  private backUrl: string = null;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        if (/^\/locate\/\d+$/i.test(event.url)) {
          // locate/:id
          this.backUrl = 'locate';
        } else if (/^\/locate$/i.test(event.url)) {
          // locate
          this.backUrl = null;
        }
      });
  }

  onBackClicked(): void {
    this.router.navigate([this.backUrl]);
  }
}
