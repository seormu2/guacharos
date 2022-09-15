import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessOK, DataAccess, validateAccess } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private URLACCESS = 'http://127.0.0.1/guacharos/paths/Access.php';

  constructor(
    private readonly http: HttpClient,
    private readonly route: Router
  ) { }

  validateAccess(data: DataAccess): Observable<AccessOK> {
    return this.http.post<AccessOK>(this.URLACCESS,data);
  }

  validateTokenAccess(id: string, token: string, path: string): any{
    return this.http.get<validateAccess>(this.URLACCESS+'?id='+id+'&token='+token).subscribe(
      (result: validateAccess) => {
        if(result.access ){
          path == 'login' ? this.route.navigate(['']) : this.route.navigate([path]);
        }else{
          this.route.navigate(['login']);
        }
      }
    );
  }

}
