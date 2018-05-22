import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import * as Globals from '../globals'
import { AuthService } from "../auth/auth.service";
import { Income } from "./income.model";


@Injectable()
export class IncomeService{

    constructor(private http:Http, private authService:AuthService){}

    getHeaders() {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ this.authService.getAuthToken());
        let opts = new RequestOptions();
        opts.headers = header;
        return opts;
    }

    getIncomeForDuration(start:number, end:number){
        const url:string = Globals.BASE_USE + 'api/income/get/'+start+"/"+end;
        return this.http.get(url, this.getHeaders());
    }


    addIncome(income:Income){
        const url:string = Globals.BASE_USE + 'api/income/add';
        return this.http.put(url, income, this.getHeaders());
    }

    updateIncome(income:Income) {
        const url:string = Globals.BASE_USE + 'api/income/update';
        return this.http.post(url, income, this.getHeaders());
    }

    delete(id:number){
        const url:string = Globals.BASE_USE + 'api/income/delete/'+id;
        return this.http.delete(url, this.getHeaders());
    }
}