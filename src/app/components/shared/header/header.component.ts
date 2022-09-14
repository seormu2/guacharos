import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date: string = null;

  constructor() { }

  ngOnInit(): void {
    
    this.getDay();
  }

  getDay(): void {
    this.date = new Date().toDateString();
  }

}
