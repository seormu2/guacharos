import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CategoriesList } from 'src/app/interfaces/categories';
import { ListProducts, ProductsSaveOK, saveProduct } from 'src/app/interfaces/products';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listCategories: CategoriesList[];
  formGroup: FormGroup;
  formSearch: FormGroup;
  messageAlert: string = '';
  typeAlert: string = '';
  idUser: string = '';
  token: string = '';
  products: ListProducts[];
  productSearch: string = '';

  constructor(
    private readonly serviceCategories: CategoriesService,
    private readonly formBuilder: FormBuilder,
    private readonly formBuilderSearch: FormBuilder,
    private readonly service: ProductsService,
    private readonly cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.idUser = this.cookieService.get('id');
    this.token = this.cookieService.get('token');
    this.createForm();
    this.createFormSearch();
    this.getCategories();
    this.getProducts();
    
  }

  createFormSearch(): void {
    this.formSearch = this.formBuilderSearch.group({
      product: ['']
    })
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      name: ['',[Validators.required, Validators.maxLength(100),Validators.minLength(3)]],
      brand: ['',[Validators.required, Validators.maxLength(100),Validators.minLength(3)]],
      amount: ['',[Validators.required, Validators.min(1)]],
      price: ['',[Validators.required, Validators.min(50)]],
      codeProduct: ['',[Validators.required, Validators.min(1)]],
      category:['',[Validators.required]]
    });
  }

  getProducts(): void {
    this.productSearch = this.formSearch.get('product').value 
    this.service.getProducts(this.productSearch).subscribe(
      (response: ListProducts[]) => {
        this.products = response
      }
    )
  }

  getCategories(): void {
    this.serviceCategories.getCategories().subscribe(
      (response: CategoriesList[]) => {
        this.listCategories = response;
      }
    )
  }

  saveProduct(): void {
    console.log("hola")
    const data: saveProduct = {
      "nameProduct": this.formGroup.get('name').value,
      "brand": this.formGroup.get('brand').value,
      "amount": this.formGroup.get('amount').value,
      "price": this.formGroup.get('price').value,
      "category": this.formGroup.get('category').value,
      "codeProduct": this.formGroup.get('codeProduct').value,
      "idPerson": this.idUser,
      "token": this.token
    }
    this.service.saveProduct(data).subscribe(
      (response: ProductsSaveOK) => {
        this.messageAlert = response.message
        this.typeAlert = 'primary';
        this.setForm();
        this.getProducts();
      },
      error => {
        this.messageAlert = error.error.message
        this.typeAlert = 'danger';
      }
    )
  }

  setForm(): void {
    this.formGroup.get('name').setValue('');
    this.formGroup.get('brand').setValue('');
    this.formGroup.get('amount').setValue('');
    this.formGroup.get('price').setValue('');
    this.formGroup.get('category').setValue('');
    this.formGroup.get('codeProduct').setValue('');
  }

  validationFileds(): void {
    this.messageAlert = '';
    if(this.formGroup.get('name').status == 'INVALID'){
      this.messageAlert = 'El nombre del producto debe tener al menos 2 caracteres y máximo a 100';
      this.typeAlert = 'danger';
    }else if(this.formGroup.get('brand').status == 'INVALID'){
      this.messageAlert = 'El nombre de la marca debe tener al menos 2 caracteres y máximo a 100';
      this.typeAlert = 'danger';
    }else if(this.formGroup.get('amount').status == 'INVALID'){
      this.messageAlert = 'La cantidad debe ser mayor a 0';
      this.typeAlert = 'danger';
    }else if(this.formGroup.get('price').status == 'INVALID'){
      this.messageAlert = 'El precio debe ser mayor a 50 pesos';
      this.typeAlert = 'danger';
    }else if(this.formGroup.get('category').status == 'INVALID'){
      this.messageAlert = 'Debes seleccionar la categoria';
      this.typeAlert = 'danger';
    }else if(this.formGroup.get('codeProduct').status == 'INVALID'){
      this.messageAlert = 'El codigo del producto no puede estar vacio';
      this.typeAlert = 'danger';
    }else{
      this.saveProduct();
    }
  }

}
