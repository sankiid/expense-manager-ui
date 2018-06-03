import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Response } from '@angular/http';
import { Category } from '../shared/category.model';
import { Type } from '../shared/Type.model';
import { NgForm } from '@angular/forms';
import { Income } from './income.model';
import { AuthService } from '../auth/auth.service';
import { IncomeService } from './income.service';
import { IncomeItemComponent } from './income-list/income-item/income-item.component';
import { Account } from '../shared/account.model';
import { AccountService } from '../shared/account.service';
import { Bank } from '../shared/bank.model';
import { IAlert } from '../alert.modal';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  
  public categories:Category[] = [];
  public accounts : Account[] = [];
  @Input()
  public alerts: Array<IAlert> = [];
  
  constructor(private categoryService : CategoryService, private authService:AuthService, private incomeService:IncomeService, private accountService:AccountService, private alertService:AlertService) { }

  ngOnInit() {
    this.categoryService.getCategoriesByType(Type.income)
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

      this.accountService.getAllAccountInfo()
      .subscribe(
        (res:Response) => {
          const data = res.json()['data'];
          data.forEach(element => {
            const bank:Bank = new Bank(element.bank.id, element.bank.name);
            const account: Account = new Account(element.id, bank, element.amount, element.accountNumber);
            this.accounts.push(account);
          });
        }
      );

      if(this.accounts == null || this.accounts.length == 0){
        this.alertService.setAlert(21, 'warning','Please add Account details before adding any expense');
        this.alerts = this.alertService.getAlerts();
      }
  }

  public getCategories(){
    return this.categories;
  }

  public getAccounts(){
    return this.accounts;
  }

  closeAlert(alert){
    this.alertService.closeAlert(alert);
  }

}
