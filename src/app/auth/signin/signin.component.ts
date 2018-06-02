import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IAlert } from '../../alert.modal';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Input()
  public alerts: Array<IAlert> = [];

  constructor(private authService: AuthService, private alertService:AlertService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
    this.alerts = this.alertService.getAlerts();
  }

  closeAlert(alert){
    this.alertService.closeAlert(alert);
  }
}
