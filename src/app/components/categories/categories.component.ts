import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CategoriesList, DeleteCategory, SaveCategory, SaveCategoryOK, UpdateCategory, UpdateCategoryOK } from 'src/app/interfaces/categories';
import { AccessService } from 'src/app/services/access.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  listCategories = null;
  formGroupSearch: FormGroup;
  formGroup: FormGroup;
  categoryUpdate: CategoriesList;
  isUpdate: boolean = false;
  messageAlert: string = '';
  idUser: string = '';
  token: string = '';

  constructor(
    private readonly service: CategoriesService,
    private readonly formBuilderSearch: FormBuilder,
    private readonly formBuilder: FormBuilder,
    private readonly cookieService: CookieService,
    private readonly serviceAccess: AccessService
  ) { }

  ngOnInit(): void {
    this.idUser = this.cookieService.get('id');
    this.token = this.cookieService.get('token');
    this.verifyAccess();
    this.getCategories();
    this.createFormSearch();
    this.createForm();
  }

  verifyAccess(): void {
    this.serviceAccess.validateTokenAccess(this.idUser,this.token,'categories');
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      category: ['', [Validators.required, Validators.maxLength(100),Validators.minLength(2)]]
    })
  }

  createFormSearch(): void {
    this.formGroupSearch = this.formBuilderSearch.group({
      category: ['',[]]
    })
  }

  getCategories(): void {
    this.service.getCategories().subscribe(
      (categories: CategoriesList[]) => {
        
        this.listCategories = categories
        console.log(this.listCategories)
      }
    )
  }

  searchCategory(): void {
    this.service.searchCategory(this.formGroupSearch.value.category).subscribe(
      (categories: CategoriesList[]) => {
        this.listCategories = categories
        console.log(this.listCategories)
      }
    )
  }

  selectCategory(category: CategoriesList): void {
    console.log("CATEG", category)
    this.messageAlert = '';
    this.categoryUpdate = category;
    this.isUpdate = true;
    this.formGroup.get('category').setValue(category.category);
  }

  updateCategory(): void {
    this.messageAlert = '';
    if(this.formGroup.get('category').status == 'VALID'){
      const categorie: UpdateCategory = {
        "idUser": this.idUser,
        "idCategory": this.categoryUpdate.id,
        "category": this.formGroup.get('category').value,
        "token": this.token
      }
      this.service.updateCategory(categorie).subscribe(
        (category: UpdateCategoryOK) => {
          console.log(category)
          this.messageAlert = category.message;
          this.isUpdate = false;
          this.formGroup.get('category').setValue('');
          this.getCategories();
        },
        error => {
          this.messageAlert = error.error.message;
          console.log("error",error)
        }
      )
    }else{
      this.messageAlert = 'La categoria debe tener al menos 2 caracteres y menor a 100';
    }
  }

  cancelUpdate(): void {
    this.isUpdate = false;
    this.formGroup.get('category').setValue('');
  }

  deleteCategory(category: CategoriesList): void {
    if(window.confirm("estas de acuerdo con eliminar la categoria "+category.category)){
      this.service.deleteCategorie(category.id, this.token,this.idUser).subscribe(
        (response: DeleteCategory) =>{
          this.messageAlert = response.message;
          this.getCategories();
        }
      )
    }
  }

  saveCategory(): void {
    this.messageAlert = '';
    if(this.formGroup.get('category').status == 'VALID'){
      const body: SaveCategory = {
        "idUser": this.idUser,
        "category": this.formGroup.get('category').value,
        "token": this.token
      }
      this.service.saveCategory(body).subscribe(
        (result: SaveCategoryOK) => {
          this.messageAlert = result.message;
          this.getCategories();
        },
        error => {
          this.messageAlert = error.error.message
        }
      )
    }else{
      this.messageAlert = 'La categoria debe tener al menos 2 caracteres y menor a 100';
    }
  }

}
