import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Type } from "./Type.model";
import * as Globals from '../globals'

@Injectable()
export class CategoryService{
    
    constructor(private http:Http){}

    getCategoriesByType(type: Type){
        const headers = new Headers({'Content-Type':'application/json'});
        const url:string = Globals.BASE_USE + 'category/get/'+type
        return this.http.get(url, {headers: headers});
    }
}