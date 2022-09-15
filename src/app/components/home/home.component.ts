import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  idUser: string = '';
  tokenUser: string = '';

  constructor(
    private readonly serviceAccess: AccessService,
    private readonly cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.tokenUser = this.cookieService.get('token');
    this.idUser = this.cookieService.get('id');
    this.verifyAccess();
  }

  verifyAccess(): void {
    this.serviceAccess.validateTokenAccess(this.idUser,this.tokenUser,'home');
  }

}
