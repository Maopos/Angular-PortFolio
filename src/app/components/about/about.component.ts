import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public greeting: string;
  public title: string;
  public subTitle: string;
  public web: string;

    constructor() {
      this.greeting = 'Hola soy'; 
      this.title = 'Mauricio Posada';
      this.subTitle = 'Desarrollador Web Frontend.';
      this.web = 'maoposites.com';
    }

  ngOnInit(): void {
  }

}
