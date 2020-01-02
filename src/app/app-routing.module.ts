import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionFormComponent } from './components/subscription-form/subscription-form.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-subscription', pathMatch: 'full'},
  { path: 'user-subscription', component: SubscriptionFormComponent },
  { path: 'list-user-subscription', component: SubscriptionListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
