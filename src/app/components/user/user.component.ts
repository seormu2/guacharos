import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formGroup: FormGroup;
  username: string = '';

  constructor(
    private readonly cookieService: CookieService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.username = this.cookieService.get('username');
    this.createForm();
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      username: [this.username, [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  updateUsername(): void {
    console.log(this.formGroup)
  }

}
