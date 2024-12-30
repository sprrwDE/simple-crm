import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PartnerComponent } from './components/partner/partner.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { LeadsComponent } from './components/leads/leads/leads.component';
import { CustomerComponent } from './components/customer/customer/customer.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: PartnerComponent },
  { path: 'leads', component: LeadsComponent },
  { path: 'customers', component: CustomerComponent },
  { path: ':type/:id', component: UserDetailComponent },
];
