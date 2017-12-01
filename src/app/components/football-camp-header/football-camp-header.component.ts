import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { FootballCampLoginComponent } from 'app/components/football-camp-login/football-camp-login.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'football-camp-header',
  templateUrl: 'football-camp-header.component.html',
  styleUrls: ['football-camp-header.component.scss']
})
export class FootballCampHeaderComponent implements OnInit {

  backUrl: string = null;

  hideLoginComponent: boolean = true;

  @Output() onMenuClickedEvent = new EventEmitter<any>();
  
  constructor(
    private router: Router,
    private dialog: MdDialog) {
  }

  ngOnInit(): void {
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        if (/^\/locate\/\d+\/details$/i.test(event.url)) {
          // locate/:id/details
          this.backUrl = event.url.replace('/details', '');
          console.log(this.backUrl);
        } else if (/^\/locate\/\d+$/i.test(event.url)) {
          // locate/:id
          this.backUrl = event.url.replace(/(\d+)/, '');
          console.log(this.backUrl);
        } else if (/^\/locate$/i.test(event.url)) {
          // locate
          this.backUrl = null;
          console.log(this.backUrl);
        }
      });
  }

  onBackClicked(): void {
    this.router.navigate([this.backUrl]);
  }

  onMenuClicked(): void {
    this.onMenuClickedEvent.emit();
  }

  onAccountClicked(): void {
    this.dialog.open(FootballCampLoginComponent);
  }
}
