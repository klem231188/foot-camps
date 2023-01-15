import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `events`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/emoji_events.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `male`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/male.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `female`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/female.svg`)
    );
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

}
