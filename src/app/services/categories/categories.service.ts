import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesList, DeleteCategory, SaveCategory, SaveCategoryOK, UpdateCategory, UpdateCategoryOK } from 'src/app/interfaces/categories';
import { AccessOK } from 'src/app/interfaces/user';

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

  updateCategory(body: UpdateCategory): Observable<UpdateCategoryOK> {
    return this.http.post<UpdateCategoryOK>(this.URL,body);
  }

  deleteCategorie(idCategory: string, token: string, idUser:string): Observable<DeleteCategory>{
    return this.http.get<DeleteCategory>(this.URL+'?idCategory='+idCategory+'&token='+token+'&idUser='+idUser);
  }

  saveCategory(body: SaveCategory): Observable<SaveCategoryOK> {
    return this.http.post<SaveCategoryOK>(this.URL+'?save', body);
  }
}
