import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessOK, UpdatePassword, UpdateUser } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'http://localhost/guacharos/paths/User.php';
  constructor(
    private readonly http: HttpClient
  ) { }

  updateUsername(body: UpdateUser): Observable<AccessOK>{
    return this.http.put<AccessOK>(this.URL, body)
  }

  updatePassword(body: UpdatePassword): Observable<AccessOK>{
    console.log("service")
    return this.http.put<AccessOK>(this.URL+'?password', body)
  }
}
