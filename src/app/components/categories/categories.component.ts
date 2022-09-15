import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesList } from 'src/app/interfaces/categories';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  listCategories = null;
  formGroupSearch: FormGroup;

  constructor(
    private readonly service: CategoriesService,
    private readonly formBuilderSearch: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.createFormSearch();
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

}
