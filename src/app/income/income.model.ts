import { Category } from "../shared/category.model";
import { Account } from "../shared/account.model";

export class Income {
    public id:number;
    public amount:number;
    public date:string;
    public notes:string;
    public category:Category
    public account:Account

    constructor(id:number, amount:number, date:string, notes:string, category:Category, account:Account){
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.notes = notes;
        this.category = category;
        this.account = account;
    }
    
}