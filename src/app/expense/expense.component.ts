import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Response } from '@angular/http';
import { Category } from '../shared/category.model';
import { Type } from '../shared/Type.model';
import { NgForm } from '@angular/forms';
import { Expense } from './expense.model';
import { AuthService } from '../auth/auth.service';
import { ExpenseService } from './expense.service';
import { ExpenseItemComponent } from './expense-list/expense-item/expense-item.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  
  public categories:Category[] = [];
  constructor(private categoryService : CategoryService, private authService:AuthService, private expenseService:ExpenseService) { }

  ngOnInit() {
    this.categoryService.getCategoriesByType(Type.expense)
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
