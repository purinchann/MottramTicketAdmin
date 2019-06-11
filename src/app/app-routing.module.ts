import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { UpdateWaitTimeComponent } from './component/update-wait-time/update-wait-time.component';
import { SearchPurchasedOrderComponent } from './component/search-purchased-order/search-purchased-order.component';
import { SendCustomMessageComponent } from './component/send-custom-message/send-custom-message.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'update-wait-time', component: UpdateWaitTimeComponent, canActivate: [AuthGuard] },
  { path: 'search-purchased-order', component: SearchPurchasedOrderComponent, canActivate: [AuthGuard] },
  { path: 'send-custom-message', component: SendCustomMessageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
