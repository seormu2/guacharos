import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessOK, DataAccess } from 'src/app/interfaces/user';
import { AccessService } from 'src/app/services/access.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  formGroup: FormGroup;
  messageError: string = '';
  tokenUser: string = '';
  idUser:    string = '';
  spinnerAccess: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly service: AccessService,
    private readonly routes: Router,
    private readonly cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.tokenUser = this.cookieService.get('token');
    this.idUser = this.cookieService.get('id');
    console.log('token',this.tokenUser)
    this.verifyAccess();
    this.createForm();
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  createSesion(): void {
    this.spinnerAccess = true;
    this.messageError = '';
    if(this.formGroup.status == 'VALID'){
      const dataUser: DataAccess = this.formGroup.value;
      this.service.validateAccess(dataUser).subscribe(
        ( access: AccessOK ) => {
          this.spinnerAccess = false;
          this.messageError = '';
          this.cookieService.set('token', access.data.token);
          this.cookieService.set('id', access.data.id);
          this.cookieService.set('username', access.data.username);
          this.routes.navigate(['']);
        }, 
        (error: HttpErrorResponse) => {
          this.messageError = error.error.message;
          this.spinnerAccess = false;
        }
      )
    }else{
      this.messageError = 'Campo usuario o contraseña vacio.';
    }
    
  }

  verifyAccess(): void {
    this.service.validateTokenAccess(this.idUser,this.tokenUser,'login');
  }

}
