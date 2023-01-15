import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-print-resume-english',
  templateUrl: './print-resume-english.component.html',
  styleUrls: ['./print-resume-english.component.scss']
})
export class PrintResumeEnglishComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  onPrint() {
    window.print();
  }
}
