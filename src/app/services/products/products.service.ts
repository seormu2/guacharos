import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListProducts, ProductsSaveOK, saveProduct } from 'src/app/interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL = 'http://127.0.0.1/guacharos/paths/Products.php';
  constructor(
    private readonly http: HttpClient
  ) { }


  saveProduct(body: saveProduct): Observable<ProductsSaveOK>{
    return this.http.post<ProductsSaveOK>(this.URL+'?saveProduct',body)
  }

  getProducts(data: string): Observable<ListProducts[]>{
    return this.http.get<ListProducts[]>(this.URL+'?search='+data);
  }
}
