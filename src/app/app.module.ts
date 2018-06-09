import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { InvestmentComponent } from './investment/investment.component';
import { HeaderComponent } from './header/header.component';
import { IncomeListComponent } from './income/income-list/income-list.component';
import { IncomeItemComponent } from './income/income-list/income-item/income-item.component';
import { AppRoutingModule } from './appRouting.module';
import { HomeComponent } from './home/home.component';
import { CategoryService } from './shared/category.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { IncomeService } from './income/income.service';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IncomeModalComponent } from './income/income-list/income-modal/income-modal.component';
import { ExpenseService } from './expense/expense.service';
import { ExpenseItemComponent } from './expense/expense-list/expense-item/expense-item.component';
import { ExpenseListComponent } from './expense/expense-list/expense-list.component';
import { ExpenseModalComponent } from './expense/expense-list/expense-modal/expense-modal.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { AuthGuard } from './auth/auth-guard.service';
import { GooglePieChartService } from './home/google-pie-chart.service';
import { PieChartComponent } from './home/pie-chart/piechart.component';
import { AccountComponent } from './account/account.component';
import { BankService } from './shared/bank.service';
import { AccountService } from './shared/account.service';
import { AccountModalComponent } from './account/account-modal/account-modal.component';
import { AlertService } from './alert.service';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    ExpenseListComponent,
    ExpenseItemComponent,
    ExpenseModalComponent,
    InvestmentComponent,
    HeaderComponent,
    IncomeComponent,
    IncomeListComponent,
    IncomeItemComponent,
    IncomeModalComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    PieChartComponent,
    AccountComponent,
    AccountModalComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [  AlertService, AccountModalComponent, AccountService, CategoryService, AuthService, IncomeService, IncomeModalComponent, NgbActiveModal, ExpenseService, ExpenseModalComponent, AuthGuard, GooglePieChartService, BankService ],
  bootstrap: [AppComponent],
  entryComponents: [IncomeModalComponent, ExpenseModalComponent, AccountModalComponent]
})
export class AppModule { }
