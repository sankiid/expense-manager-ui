import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import * as Globals from '../globals'
import { AuthService } from "../auth/auth.service";
import { Expense } from "./expense.model";


@Injectable()
export class ExpenseService{

    constructor(private http:Http, private authService:AuthService){}

    getHeaders() {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ this.authService.getAuthToken());
        let opts = new RequestOptions();
        opts.headers = header;
        return opts;
    }

    getExpenseForLastOneMonth(start:number, end:number){
        const url:string = Globals.BASE_USE + 'api/expense/get/'+start+"/"+end;
        return this.http.get(url, this.getHeaders());
    }


    addExpense(expense:Expense){
        const url:string = Globals.BASE_USE + 'api/expense/add';
        return this.http.put(url, expense, this.getHeaders());
    }

    updateExpense(expense:Expense) {
        const url:string = Globals.BASE_USE + 'api/expense/update';
        return this.http.post(url, expense, this.getHeaders());
    }

    delete(id:number){
        const url:string = Globals.BASE_USE + 'api/expense/delete/'+id;
        return this.http.delete(url, this.getHeaders());
    }
}