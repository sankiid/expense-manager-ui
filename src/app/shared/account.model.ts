import { Bank } from "./bank.model";

export class Account{

    public id:number;
    public bank:Bank;
    public amount:number;
    public accountNumber:string;
    
constructor(id:number, bank:Bank, amount:number, accountNumber:string){
        this.id = id;
        this.bank = bank;
        this.amount = amount;
        this.accountNumber = accountNumber;
    }
}