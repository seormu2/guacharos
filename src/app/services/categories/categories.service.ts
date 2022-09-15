import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesList } from 'src/app/interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private URL = 'http://127.0.0.1/guacharos/paths/Category.php';
  constructor(
    private readonly http: HttpClient
  ) { }

  getCategories(): Observable<CategoriesList[]>{
    return this.http.get<CategoriesList[]>(this.URL+'?getCategories');
  }

  searchCategory(category: string): Observable<CategoriesList[]>{
    return this.http.get<CategoriesList[]>(this.URL+'?searchCategory='+category);
  }
}
