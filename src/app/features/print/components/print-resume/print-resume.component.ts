import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-print-resume',
  templateUrl: './print-resume.component.html',
  styleUrls: ['./print-resume.component.scss']
})
export class PrintResumeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  onPrint() {
    window.print();
  }
}
