import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import * as Globals from '../globals'
import { Router } from "@angular/router";
import { AlertService } from "../alert.service";

@Injectable()
export class AuthService{
    private token: string;
    private userId : string;

    constructor(private http:Http, private router:Router, public alertService:AlertService){}
    
    signupUser(email:string, password: string, name:string){
        const url:string = Globals.BASE_USE + 'register';
        const headers = new Headers({'Content-Type':'application/json'});
        const data = {"userName": email, "password" : password, "name":name};
        this.http.put(url, data, {headers: headers}).subscribe(
            (sucess) => {
                this.alertService.setAlert({
                    id: 2,
                    type: 'success',
                    message: 'Account created successfully. Welcome to the world of savings'
                });
            },
            (error) => {
                error = error.json();
                let message:string = 'Unable to create account. Please try after some time!';
                if(error['code'] == 900){
                    message = 'Unable to create account. User already exist with this mail'
                }
                this.alertService.setAlert({
                    id: 3,
                    type: 'danger',
                    message: message
                });
            }
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
            (error) => {
                this.alertService.setAlert({
                    id: 1,
                    type: 'danger',
                    message: 'Invalid username or password'
                });
            }
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