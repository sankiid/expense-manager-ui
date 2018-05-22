import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { InvestmentComponent } from './investment/investment.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AccountComponent } from './account/account.component';

const appRoute: Routes = [
    {path:'', redirectTo: '/signin',   pathMatch: 'full' },
    {path:'home', component: HomeComponent, canActivate: [AuthGuard] },
    {path:'income', component: IncomeComponent, canActivate: [AuthGuard]  },
    {path:'expense', component: ExpenseComponent, canActivate: [AuthGuard]  },
    {path:'investment', component: InvestmentComponent, canActivate: [AuthGuard]  },
    {path:'signup', component: SignupComponent},
    {path:'signin', component: SigninComponent},
    {path:'account', component: AccountComponent, canActivate: [AuthGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})
export class AppRoutingModule{
}