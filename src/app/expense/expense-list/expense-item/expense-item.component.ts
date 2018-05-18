import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../shared/category.model';
import { Expense } from '../../expense.model';
import { ExpenseService } from '../../expense.service';
import { ExpenseListComponent } from '../expense-list.component';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.css']
})
export class ExpenseItemComponent implements OnInit {

  public categories:Category[] = [];
  
  constructor(private expenseService:ExpenseService, @Inject(ExpenseListComponent) private expenseListComponent:ExpenseListComponent) { }

  ngOnInit() {
    this.categories = this.expenseListComponent.getCategories();
  }

  onAddExpense(form:NgForm){
    let catName:string = null;
    this.categories.forEach( c => {
      if(c.id == form.value.category){
        catName = c.name;
      }
    })
    const cat:Category = new Category(form.value.category, catName);
    const expense:Expense = new Expense(-1, form.value.amount, form.value.date, form.value.notes, cat);
    this.expenseService.addExpense(expense)
    .subscribe(
      (res) => {
        res = res.json();
        res = res['data'];
        expense.id = res['id'];
        console.log(res);
        this.expenseListComponent.addExpenseRecord(expense);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
