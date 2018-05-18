import { Component, OnInit, Inject } from '@angular/core';
import { Income } from '../income.model';
import { Category } from '../../shared/category.model';
import { Response } from '@angular/http';
import { IncomeService } from '../income.service';
import * as Globals from '../../globals';
import { IncomeComponent } from '../income.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IncomeModalComponent } from './income-modal/income-modal.component';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {

  public incomes : Income[] = [];

  constructor( private incomeModal:IncomeModalComponent,
    private incomeService:IncomeService, 
    @Inject(IncomeComponent) private incomeComponent:IncomeComponent) { }

  ngOnInit() {
    this.incomeService.getIncomeForLastOneMonth(Date.now() - Globals.DAY_30_MILLI_SEC, Date.now())
      .subscribe(
        (response: Response) => {
          const res = response.json();
          const data = res['data'];
          data.forEach(element => {
            const cat:Category = new Category(element.category.id, element.category.name);
            const inc: Income = new Income(element.id, element.amount, element.date, element.notes, cat);
            this.incomes.push(inc);
          });
        },
        (error) => console.log(error)
      );
  }

  public addIncomeRecord(income:Income){
    this.incomes.push(income);
  }

  public getCategories(){
    return this.incomeComponent.categories;
  }

  public onEditIncome(event:Event, income:Income){
    this.incomeModal.editIncome(income, this.getCategories(), this.incomes);
  }

  public onDeleteIncome(event:Event, id:number){
    this.incomeService.delete(id).subscribe(
      (res) => {
        const index = this.incomes.findIndex(e => e.id === id);
        this.incomes.splice(index, 1);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
