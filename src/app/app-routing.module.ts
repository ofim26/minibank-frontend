import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

//components
import { MovementsComponent } from './components/movements/movements.component';
import { AddMoneyComponent } from './components/add-money/add-money.component';
import { TransferMoneyComponent } from './components/transfer-money/transfer-money.component';
import { WithdrawMoneyComponent } from './components/withdraw-money/withdraw-money.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'movements',
    component: MovementsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-money',
    component: AddMoneyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transfer-money',
    component: TransferMoneyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'withdraw-money',
    component: WithdrawMoneyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
