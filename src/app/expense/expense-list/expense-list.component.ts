import { Component, OnInit, Inject } from '@angular/core';
import { Expense } from '../expense.model';
import { Category } from '../../shared/category.model';
import { Response } from '@angular/http';
import { ExpenseService } from '../expense.service';
import * as Globals from '../../globals';
import { ExpenseComponent } from '../expense.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseModalComponent } from './expense-modal/expense-modal.component';
import { Bank } from '../../shared/bank.model';
import { Account } from '../../shared/account.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  public expenses : Expense[] = [];

  constructor( private expenseModal:ExpenseModalComponent,
    private expenseService:ExpenseService, 
    @Inject(ExpenseComponent) private expenseComponent:ExpenseComponent) { }

  ngOnInit() {
    this.expenseService.getExpenseForDuration(Globals.MONTH_START, Globals.TODAY)
      .subscribe(
        (response: Response) => {
          const res = response.json();
          const data = res['data'];
          data.forEach(element => {
            const cat:Category = new Category(element.category.id, element.category.name);
            const bank:Bank = new Bank(element.account.bank.id, element.account.bank.name);
            const account:Account = new Account(element.account.id, bank, element.account.amount, element.account.accountNumber);
            const inc: Expense = new Expense(element.id, element.amount, element.date, element.notes, cat, account);
            this.expenses.push(inc);
          });
        },
        (error) => console.log(error)
      );
  }

  public addExpenseRecord(expense:Expense){
    this.expenses.push(expense);
  }

  public getCategories(){
    return this.expenseComponent.categories;
  }

  public getAccounts(){
    return this.expenseComponent.accounts;
  }

  public onEditExpense(event:Event, expense:Expense){
    this.expenseModal.editExpense(expense, this.getCategories(), this.expenses, this.getAccounts());
  }

  public onDeleteExpense(event:Event, id:number){
    this.expenseService.delete(id).subscribe(
      (res) => {
        const index = this.expenses.findIndex(e => e.id === id);
        this.expenses.splice(index, 1);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
