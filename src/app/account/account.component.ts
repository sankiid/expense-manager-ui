import { Component, OnInit } from '@angular/core';
import { Bank } from '../shared/bank.model';
import { BankService } from '../shared/bank.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public banks:Bank[] = [];
  constructor(private bankService:BankService) { }

  ngOnInit() {
    this.bankService.getBanks().subscribe((res) => {
        const data = res.json()['data'];
        data.forEach(element => {
          const bank: Bank = new Bank(element.id, element.name);
          this.banks.push(bank);
        });
    });
  }

}
