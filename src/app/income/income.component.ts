import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Response } from '@angular/http';
import { Category } from '../shared/category.model';
import { Type } from '../shared/Type.model';
import { NgForm } from '@angular/forms';
import { Income } from './income.model';
import { AuthService } from '../auth/auth.service';
import { IncomeService } from './income.service';
import { IncomeItemComponent } from './income-list/income-item/income-item.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  
  public categories:Category[] = [];
  constructor(private categoryService : CategoryService, private authService:AuthService, private incomeService:IncomeService) { }

  ngOnInit() {
    this.categoryService.getCategoriesByType(Type.income)
      .subscribe(
        (response: Response) => {
          const res = response.json();
          const data = res['data'];
          data.forEach(element => {
            const cate: Category = new Category(element.id, element.name);
            this.categories.push(cate);
          });
        },
        (error) => console.log(error)
      );
  }

  public getCategories(){
    return this.categories;
  }

}
