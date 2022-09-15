import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date: string = null;

  constructor(
    private readonly cookies: CookieService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    
    this.getDay();
  }

  getDay(): void {
    this.date = new Date().toDateString();
  }

  closeAccess(): void {
    console.log("Hola")
    this.cookies.set('token', '');
    this.router.navigate(['/login'])
  }

}
