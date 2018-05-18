import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../shared/category.model';
import { Income } from '../../income.model';
import { IncomeService } from '../../income.service';
import { IncomeListComponent } from '../income-list.component';

@Component({
  selector: 'app-income-item',
  templateUrl: './income-item.component.html',
  styleUrls: ['./income-item.component.css']
})
export class IncomeItemComponent implements OnInit {

  public categories:Category[] = [];
  
  constructor(private incomeService:IncomeService, @Inject(IncomeListComponent) private incomeListComponent:IncomeListComponent) { }

  ngOnInit() {
    this.categories = this.incomeListComponent.getCategories();
  }

  onAddIncome(form:NgForm){
    let catName:string = null;
    this.categories.forEach( c => {
      if(c.id == form.value.category){
        catName = c.name;
      }
    })
    const cat:Category = new Category(form.value.category, catName);
    const income:Income = new Income(-1, form.value.amount, form.value.date, form.value.notes, cat);
    this.incomeService.addIncome(income)
    .subscribe(
      (res) => {
        res = res.json();
        res = res['data'];
        income.id = res['id'];
        console.log(res);
        this.incomeListComponent.addIncomeRecord(income);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
