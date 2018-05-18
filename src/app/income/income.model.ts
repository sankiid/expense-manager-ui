import { Category } from "../shared/category.model";

export class Income {
    public id:number;
    public amount:number;
    public date:string;
    public notes:string;
    public category:Category

    constructor(id:number, amount:number, date:string, notes:string, category:Category){
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.notes = notes;
        this.category = category;
    }
    
}