import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { AccessOK, UpdatePassword, UpdateUser } from 'src/app/interfaces/user';
import { AccessService } from 'src/app/services/access.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formGroup: FormGroup;
  username: string = '';
  idUser: string = '';
  tokenUser: string = '';
  spinnerUser: boolean = false;
  spinnerPassword: boolean = false;
  messageUser: string = '';
  messagePassword: string = '';

  constructor(
    private readonly cookieService: CookieService,
    private readonly formBuilder: FormBuilder,
    private readonly service: UserService,
    private readonly serviceAccess: AccessService,
  ) { }

  ngOnInit(): void {
    this.tokenUser = this.cookieService.get('token');
    this.idUser = this.cookieService.get('id');
    this.username = this.cookieService.get('username');
    this.verifyAccess()
    this.createForm();
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      username: [this.username, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    });
  }

  updateUsername(): void {
    if(this.formGroup.get('username').status != 'INVALID'){
      this.spinnerUser = true;
      const data: UpdateUser = {
        "idUser": this.idUser,
        "username": this.formGroup.value.username,
        "token": this.tokenUser
      }
      this.service.updateUsername(data).subscribe(
        (user: AccessOK) => {
          this.cookieService.set('username', user.data.username)
          this.spinnerUser = false;
          this.messageUser = user.message;
        },
        error => {
          this.spinnerUser = false;
          this.messageUser = error.error.message;
        }
      );
    }else{
      this.messageUser = 'El usuario debe contener al menos 5 caracteres y maximo 10'
    }
  }

  updatePassword(): void {
    this.messagePassword = '';
    const data: UpdatePassword = {
      "idUser": this.idUser,
      "password": this.formGroup.value.password,
      "token": this.tokenUser
    }
    if(this.formGroup.get('password').status != 'INVALID'){
      this.spinnerPassword = true;
      this.service.updatePassword(data).subscribe(
        (user: AccessOK) => {
          this.spinnerPassword = false;
          this.messagePassword = user.message;
        },
        error => {
          this.spinnerPassword = false;
          this.messagePassword = error.error.message;
        }
      );
    }else{
      this.messagePassword = 'La contraseña debe contener al menos 5 caracteres y maximo 20'
    }
  }

  verifyAccess(): void {
    this.serviceAccess.validateTokenAccess(this.idUser,this.tokenUser,'configuration');
  }

}
