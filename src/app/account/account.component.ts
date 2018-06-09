import { Component, OnInit } from '@angular/core';
import { Bank } from '../shared/bank.model';
import { BankService } from '../shared/bank.service';
import { Account } from '../shared/account.model';
import { NgForm } from '@angular/forms';
import { AccountService } from '../shared/account.service';
import { AccountModalComponent } from './account-modal/account-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public banks:Bank[] = [];
  public accounts:Account [] = [];
  public totalAmount:number = 0.0;
  constructor(private bankService:BankService, private accountServive:AccountService, private accountComp:AccountModalComponent) { }

  ngOnInit() {
    this.bankService.getBanks().subscribe((res) => {
        const data = res.json()['data'];
        data.forEach(element => {
          const bank: Bank = new Bank(element.id, element.name);
          this.banks.push(bank);
        });
    });

    this.accountServive.getAllAccountInfo().subscribe(
      (res) => {
        const accts = res.json()['data'];
        accts.forEach(acct => {
          const bank:Bank = new Bank(acct.bank.id, acct.bank.name);
          const account:Account = new Account(acct.id, bank, acct.amount, acct.accountNumber);
          this.accounts.push(account);
        });
        this.getTotalAmount();
      }
    );

  }

  public onDeleteBank(event:Event, id:number){
    console.log("opration not supported.");
    // this.accountServive.delete(id).subscribe(
    //   (res) => {
    //     const index = this.accounts.findIndex(e => e.id === id);
    //     this.accounts.splice(index, 1);
    //     this.getTotalAmount();
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }


  public onAddBank(form:NgForm) {
    let bankName:string = null;
        this.banks.forEach( b => {
        if(b.id == form.value.bank){
          bankName = b.name;
        }
    })
    let bank:Bank = new Bank(form.value.bank, bankName);
    let account:Account = new Account(-1, bank, form.value.amount, form.value.accountNumber);
    this.accountServive.save(account)
    .subscribe(
      (res) => {
        res = res.json();
        res = res['data'];
        account.id = res['id'];
        this.accounts.push(account);
        this.getTotalAmount();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public onEditBank(event:Event, account:Account){
    this.accountComp.onEdit(account, this.banks, this.accounts);
    this.getTotalAmount();
  }

  public getTotalAmount(){
    let total:number = 0;
    for(let i=0;i<this.accounts.length;++i){
      total += this.accounts[i].amount
    }
    this.totalAmount  = total;
  }

}
