import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Type } from "./Type.model";
import * as Globals from '../globals'

@Injectable()
export class BankService{
    
    constructor(private http:Http){}

    getBanks() {
        const headers = new Headers({'Content-Type':'application/json'});
        const url:string = Globals.BASE_USE + 'bank/getall';
        return this.http.get(url, {headers: headers});
    }
}