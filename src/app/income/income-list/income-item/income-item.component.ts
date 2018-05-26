import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../shared/category.model';
import { Income } from '../../income.model';
import { IncomeService } from '../../income.service';
import { IncomeListComponent } from '../income-list.component';
import { Account } from '../../../shared/account.model';

@Component({
  selector: 'app-income-item',
  templateUrl: './income-item.component.html',
  styleUrls: ['./income-item.component.css']
})
export class IncomeItemComponent implements OnInit {

  public categories:Category[] = [];
  public accounts:Account[] = [];

  constructor(private incomeService:IncomeService, @Inject(IncomeListComponent) private incomeListComponent:IncomeListComponent) { }

  ngOnInit() {
    this.categories = this.incomeListComponent.getCategories();
    this.accounts = this.incomeListComponent.getAccounts();
  }

  onAddIncome(form:NgForm){
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

    const income:Income = new Income(-1, form.value.amount, form.value.date, form.value.notes, cat, acct);
    this.incomeService.addIncome(income)
    .subscribe(
      (res) => {
        res = res.json()['data'];
        income.id = res['id'];
        this.incomeListComponent.addIncomeRecord(income);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
