import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/partner/user/user.component';
import { UserDetailComponent } from './components/partner/user-detail/user-detail.component';
import { LeadsComponent } from './components/leads/leads/leads.component';
import { CustomerComponent } from './components/customer/customer/customer.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UserComponent },
  { path: 'leads', component: LeadsComponent },
  { path: 'customers', component: CustomerComponent },
  { path: ':type/:id', component: UserDetailComponent },
];
