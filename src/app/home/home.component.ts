import { Component, OnInit, Inject, Injectable, ViewChild, ElementRef } from '@angular/core';
import { IncomeService } from '../income/income.service';
import { ExpenseService } from '../expense/expense.service';
import * as Globals from '../globals';
import { Category } from '../shared/category.model';
import { Response } from '@angular/http';
import { PieChartConfig } from './modal/pie-chart.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {

  public income: any[];
  public incomecnf: PieChartConfig;
  public incomeEle: String;

  public expense: any[];
  public expensecnf: PieChartConfig;
  public expenseEle: String;

  public inc: any[];
  public inccnf: PieChartConfig;
  public incEle: String;

  public exp: any[];
  public expcnf: PieChartConfig;
  public expEle: String;

  constructor(private incService:IncomeService, private expService:ExpenseService) {}

  ngOnInit() {
    this.income = this.getIncomes(Globals.MONTH_START, Globals.TODAY);
    this.incomecnf = new PieChartConfig('Income View', 0.4);
    this.incomeEle = 'incomeEle';

    this.expense = this.getExpense(Globals.MONTH_START, Globals.TODAY);
    this.expensecnf = new PieChartConfig('Expense View', 0.4);
    this.expenseEle = 'expenseEle';

    this.inc = this.getIncomes(Globals.LAUNCH_DAY, Globals.TODAY);
    this.inccnf = new PieChartConfig('Income View', 0.4);
    this.incEle = 'incEle';

    this.exp = this.getExpense(Globals.LAUNCH_DAY, Globals.TODAY);
    this.expcnf = new PieChartConfig('Expense View', 0.4);
    this.expEle = 'expEle';
  }

  public getIncomes(start:number, end:number) {
    const map:any = {};
    let datas = [];
    datas.push(['category', 'amount']);
    this.incService.getIncomeForDuration(start, end)
      .subscribe((res: Response) => {
        res.json()['data'].forEach(e => {
          let cat:string = e.category.name;
          let amt:number = parseInt(e.amount);
          if(typeof(map[cat]) != 'undefined') {
            map[cat] = map[cat] + amt;
          } else {
            map[cat] = amt;
          }
        });
        for (let key in map) {
          datas.push([key, map[key]]);
        }
      });
      return datas;
  }

  public getExpense(start:number, end:number) {
    let datas = [['category', 'amount']];
    this.expService.getExpenseForDuration(start, end)
      .subscribe((response: Response) => {
        const res = response.json();
        const data = res['data'];
        let map = {};
        data.forEach(e => {
          let cat = e.category.name;
          if (typeof(map[cat]) != 'undefined') {
              map[cat] = map[cat] + e.amount;
            } else {
              map[cat] = e.amount;
            }
        });
        for (let key in map) {
          datas.push([key, map[key]]);
        }
      });
      return datas;
  }

}
