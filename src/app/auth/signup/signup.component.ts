import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertService } from '../../alert.service';
import { IAlert } from '../../alert.modal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Input()
  public alerts: Array<IAlert> = [];
  constructor(private authService: AuthService, private alertService:AlertService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    this.authService.signupUser(email, password, name);
    this.alerts = this.alertService.getAlerts();
  }

  closeAlert(alert){
    this.alertService.closeAlert(alert);
  }
}
