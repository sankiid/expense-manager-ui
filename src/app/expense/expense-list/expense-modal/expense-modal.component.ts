import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Expense } from '../../expense.model';
import { Category } from '../../../shared/category.model';
import { NgForm } from '@angular/forms';
import { ExpenseService } from '../../expense.service';

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

  constructor(
    private modalService: NgbModal, 
    public activeModal: NgbActiveModal,
    private expenseService:ExpenseService) { }

  ngOnInit() {
  }

  public editExpense(expense:Expense, categories:Category[], expenses:Expense[]){
    let modal: NgbModalRef = this.modalService.open(ExpenseModalComponent);
    modal.componentInstance.expense = expense;
    modal.componentInstance.categories = categories;
    modal.componentInstance.expenses = expenses;
    
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
    console.log(form.value)
    let catName:string = null;
    this.categories.forEach( c => {
      if(c.id == form.value.category){
        catName = c.name;
      }
    })
    const cat:Category = new Category(form.value.category, catName);
    
    const expense:Expense = new Expense(form.value.id, form.value.amount, form.value.date, form.value.notes, cat);
    this.expenseService.updateExpense(expense)
    .subscribe(
      (res) => {
        console.log(expense);
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
