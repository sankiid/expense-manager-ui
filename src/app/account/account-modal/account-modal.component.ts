import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Account } from '../../shared/account.model';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../shared/account.service';
import { Bank } from '../../shared/bank.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class AccountModalComponent implements OnInit {
  
  @Input() account: Account;
  @Input() banks: Bank[];
  @Input() accounts: Account[];

  constructor(
    private modalService: NgbModal, 
    public activeModal: NgbActiveModal,
    private accountService:AccountService) { }

  ngOnInit() {
  }

  public onEdit(account:Account, banks:Bank[], accounts:Account[]){
    let modal: NgbModalRef = this.modalService.open(AccountModalComponent);
    modal.componentInstance.account = account;
    modal.componentInstance.banks = banks;
    modal.componentInstance.accounts = accounts;
    
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

  onUpdateAccount(form:NgForm){
    let bankName:string = null;
    this.banks.forEach( b => {
      if(b.id == form.value.bank){
        bankName = b.name;
      }
    })
    const bank:Bank = new Bank(form.value.bank, bankName);
    const account:Account = new Account(form.value.id, bank, form.value.amount, form.value.accountNumber);

    this.accountService.updateAccount(account)
    .subscribe(
      (res) => {
        console.log(account);
        const index = this.accounts.findIndex(e => (e.id === account.id));
        this.accounts.splice(index, 1);
        this.accounts.push(account);
        this.activeModal.close('Modal Closed');
      },
      (err) => {
        console.log(err);
      }
    );
  }

}