import { Component, OnInit, Inject } from '@angular/core';
import { Income } from '../income.model';
import { Category } from '../../shared/category.model';
import { Response } from '@angular/http';
import { IncomeService } from '../income.service';
import * as Globals from '../../globals';
import { IncomeComponent } from '../income.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IncomeModalComponent } from './income-modal/income-modal.component';
import { Account } from '../../shared/account.model';
import { Bank } from '../../shared/bank.model';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {

  public incomes : Income[] = [];
  public totalAmount:number = 0;
  constructor( private incomeModal:IncomeModalComponent,
    private incomeService:IncomeService, 
    @Inject(IncomeComponent) private incomeComponent:IncomeComponent) { }

  ngOnInit() {
    this.incomeService.getIncomeForDuration(Globals.MONTH_START, Globals.TODAY)
      .subscribe(
        (response: Response) => {
          const res = response.json();
          const data = res['data'];
          data.forEach(element => {
            const cat:Category = new Category(element.category.id, element.category.name);
            const bank:Bank = new Bank(element.account.bank.id, element.account.bank.name);
            const account:Account = new Account(element.account.id, bank, element.account.amount, element.account.accountNumber);
            const inc: Income = new Income(element.id, element.amount, element.date, element.notes, cat, account);
            this.incomes.push(inc);
          });
          this.getTotalAmount();
        },
        (error) => console.log(error)
      );
  }

  public addIncomeRecord(income:Income){
    this.incomes.push(income);
    this.getTotalAmount();
  }

  public getCategories(){
    return this.incomeComponent.categories;
  }

  public getAccounts(){
    return this.incomeComponent.accounts;
  }

  public onEditIncome(event:Event, income:Income){
    this.incomeModal.editIncome(income, this.getCategories(), this.incomes, this.getAccounts());
    this.getTotalAmount();
  }

  public onDeleteIncome(event:Event, id:number){
    this.incomeService.delete(id).subscribe(
      (res) => {
        const index = this.incomes.findIndex(e => e.id === id);
        this.incomes.splice(index, 1);
        this.getTotalAmount();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public getTotalAmount(){
    let total:number = 0;
    for(let i=0;i<this.incomes.length;++i){
      total += this.incomes[i].amount
    }
    this.totalAmount  = total;
  }
}
