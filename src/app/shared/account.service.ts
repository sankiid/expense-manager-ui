import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import * as Globals from '../globals'
import { AuthService } from "../auth/auth.service";
import { Account } from "./account.model";

@Injectable()
export class AccountService{
  
    constructor(private http:Http, private authService: AuthService){}

    save(account:Account){
        const url:string = Globals.BASE_USE + 'api/account/add'
        return this.http.put(url, account, this.getHeaders());
    }
    
    delete(id: number) {
        const url:string = Globals.BASE_USE + 'api/account/delete/'+id;
        return this.http.delete(url, this.getHeaders());
    }

    getHeaders() {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ this.authService.getAuthToken());
        let opts = new RequestOptions();
        opts.headers = header;
        return opts;
    }

    getAllAccountInfo() {
        const url:string = Globals.BASE_USE + 'api/account/getall';
        return this.http.get(url, this.getHeaders());
    }

    public updateAccount(account: Account) {
        const url:string = Globals.BASE_USE + 'api/account/update';
        return this.http.post(url, account, this.getHeaders());
    }
}