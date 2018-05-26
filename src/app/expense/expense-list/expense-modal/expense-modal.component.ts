import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Expense } from '../../expense.model';
import { Category } from '../../../shared/category.model';
import { NgForm } from '@angular/forms';
import { ExpenseService } from '../../expense.service';
import { Account } from '../../../shared/account.model';
import { AccountService } from '../../../shared/account.service';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class ExpenseModalComponent implements OnInit {

  @Input() expense: Expense;
  @Input() categories: Category[];
  @Input() expenses: Expense[];
  @Input() accounts:Account[];
  
  constructor(
    private modalService: NgbModal, 
    public activeModal: NgbActiveModal,
    private expenseService:ExpenseService,
    private accountService:AccountService) { }

  ngOnInit() {
  }

  public editExpense(expense:Expense, categories:Category[], expenses:Expense[], accounts:Account[]){
    let modal: NgbModalRef = this.modalService.open(ExpenseModalComponent);
    modal.componentInstance.expense = expense;
    modal.componentInstance.categories = categories;
    modal.componentInstance.expenses = expenses;
    modal.componentInstance.accounts = accounts;

    modal.result.then((res) => {
      console.log(res);
    }, (reason) => {
      console.log(reason);
    }).catch((err) => {
      console.log(err);
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  onUpdateExpense(form:NgForm){
    let cat:Category = null;
    this.categories.forEach( c => {
      if(c.id == form.value.category){
        cat = c;
      }
    });
    
    let acct:Account = null;
    this.accounts.forEach( a => {
      if(a.id == form.value.accountId){
        acct = a;
      }
    });

    const expense:Expense = new Expense(form.value.id, form.value.amount, form.value.date, form.value.notes, cat, acct);
    this.expenseService.updateExpense(expense)
    .subscribe(
      (res) => {
        const index = this.expenses.findIndex(e => (e.id === expense.id));
        this.expenses.splice(index, 1);
        this.expenses.push(expense);
        this.activeModal.close('Modal Closed');
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
