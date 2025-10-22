import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { SecurityAlertsComponent } from './security-alerts/security-alerts.component';
import { SystemMetricsComponent } from './system-metrics/system-metrics.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardOverviewComponent
  }
];

@NgModule({
  declarations: [
    DashboardOverviewComponent,
    SecurityAlertsComponent,
    SystemMetricsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    DashboardOverviewComponent,
    SecurityAlertsComponent,
    SystemMetricsComponent
  ]
})
export class DashboardModule { }