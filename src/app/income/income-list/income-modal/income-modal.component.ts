import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Income } from '../../income.model';
import { Category } from '../../../shared/category.model';
import { NgForm } from '@angular/forms';
import { IncomeService } from '../../income.service';

@Component({
  selector: 'app-income-modal',
  templateUrl: './income-modal.component.html',
  styleUrls: ['./income-modal.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class IncomeModalComponent implements OnInit {

  @Input() income: Income;
  @Input() categories: Category[];
  @Input() incomes: Income[];

  constructor(
    private modalService: NgbModal, 
    public activeModal: NgbActiveModal,
    private incomeService:IncomeService) { }

  ngOnInit() {
  }

  public editIncome(income:Income, categories:Category[], incomes:Income[]){
    let modal: NgbModalRef = this.modalService.open(IncomeModalComponent);
    modal.componentInstance.income = income;
    modal.componentInstance.categories = categories;
    modal.componentInstance.incomes = incomes;
    
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

  onUpdateIncome(form:NgForm){
    console.log(form.value)
    let catName:string = null;
    this.categories.forEach( c => {
      if(c.id == form.value.category){
        catName = c.name;
      }
    })
    const cat:Category = new Category(form.value.category, catName);
    
    const income:Income = new Income(form.value.id, form.value.amount, form.value.date, form.value.notes, cat);
    this.incomeService.updateIncome(income)
    .subscribe(
      (res) => {
        console.log(income);
        const index = this.incomes.findIndex(e => (e.id === income.id));
        this.incomes.splice(index, 1);
        this.incomes.push(income);
        this.activeModal.close('Modal Closed');
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
