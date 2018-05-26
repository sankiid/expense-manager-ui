import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../shared/category.model';
import { Expense } from '../../expense.model';
import { ExpenseService } from '../../expense.service';
import { ExpenseListComponent } from '../expense-list.component';
import { Account } from '../../../shared/account.model';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.css']
})
export class ExpenseItemComponent implements OnInit {

  public categories:Category[] = [];
  public accounts:Account[] = [];
  
  constructor(private expenseService:ExpenseService, @Inject(ExpenseListComponent) private expenseListComponent:ExpenseListComponent) { }

  ngOnInit() {
    this.categories = this.expenseListComponent.getCategories();
    this.accounts = this.expenseListComponent.getAccounts();
  }

  onAddExpense(form:NgForm){
    let cat:Category = null;
    this.categories.forEach( c => {
      if(c.id == form.value.category){
        cat = c;
      }
    })
    let acct:Account = null;
    this.accounts.forEach(a => {
      if(a.id == form.value.accountId){
        acct = a;
      }
    });

    const expense:Expense = new Expense(-1, form.value.amount, form.value.date, form.value.notes, cat, acct);
    this.expenseService.addExpense(expense)
    .subscribe(
      (res) => {
        res = res.json();
        res = res['data'];
        expense.id = res['id'];
        this.expenseListComponent.addExpenseRecord(expense);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
