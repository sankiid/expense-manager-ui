import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import * as Globals from '../globals'
import { Router } from "@angular/router";

@Injectable()
export class AuthService{
    private token: string;
    private userId : string;

    constructor(private http:Http, private router:Router){}
    
    signupUser(email:string, password: string, name:string){
        const url:string = Globals.BASE_USE + 'register';
        const headers = new Headers({'Content-Type':'application/json'});
        const data = {"userName": email, "password" : password, "name":name};
        this.http.put(url, data, {headers: headers}).subscribe(
            (sucess) => (console.log(sucess)),
            (error) => (console.log(error))
        );
    }

    signinUser(email:string, password: string){
        const url:string = Globals.BASE_USE + 'authenticate';
        const headers = new Headers({'Content-Type':'application/json'});
        const data = {"userName": email, "password" : password};
        this.http.post(url, data, {headers: headers}).subscribe(
            (response: Response) => {
                const res = response.json();
                const data = res['data'];
                this.token = data.token;
                this.userId = data.userId;
                console.log(this.token);
                this.router.navigate(['\home']);
            },
            (error) => (console.log(error))
        );
    }

    getAuthToken(){
        return this.token;
    }

    isAuthenticated(){
        return this.token != null;
    }

    signout(){
        this.token = null;
    }
}