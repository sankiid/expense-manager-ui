import { Component, OnInit } from '@angular/core';
import { Bank } from '../shared/bank.model';
import { BankService } from '../shared/bank.service';
import { Account } from '../shared/account.model';
import { NgForm } from '@angular/forms';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public banks:Bank[] = [];
  public accounts:Account [] = [];
  constructor(private bankService:BankService, private accountServive:AccountService) { }

  ngOnInit() {
    this.bankService.getBanks().subscribe((res) => {
        const data = res.json()['data'];
        data.forEach(element => {
          const bank: Bank = new Bank(element.id, element.name);
          this.banks.push(bank);
        });
    });
  }

  onAddBank(form:NgForm) {
    let bankName:string = null;
        this.banks.forEach( b => {
        if(b.id == form.value.bank){
          bankName = b.name;
        }
    })
    console.log(form.value.amount);
    console.log(form.value.bank);
    console.log(form.value.accountNumber);
    let bank:Bank = new Bank(form.value.bank, bankName);
    let account:Account = new Account(-1, bank, form.value.amount, form.value.accountNumber);
    this.accountServive.save(account)
    .subscribe(
      (res) => {
        res = res.json();
        res = res['data'];
        account.id = res['id'];
        console.log(res);
        this.accounts.push(account);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
