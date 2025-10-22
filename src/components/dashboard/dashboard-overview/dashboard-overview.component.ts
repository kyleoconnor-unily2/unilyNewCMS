import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsStateService } from '../../../services/cms-core/cms-state.service';
import { SystemMonitoringService } from '../../../services/system/system-monitoring.service';

@Component({
  selector: 'dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  criticalIssuesCount = 0;
  systemHealthScore = 100;
  servicesDown = 0;
  activeUsers = 0;

  constructor(
    private cmsState: CmsStateService,
    private systemMonitoring: SystemMonitoringService
  ) {}

  ngOnInit(): void {
    // Update metrics from system monitoring
    this.systemMonitoring.alerts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.criticalIssuesCount = this.systemMonitoring.getCriticalIssuesCount();
      });

    this.systemMonitoring.metrics$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.systemHealthScore = this.systemMonitoring.getSystemHealthScore();
      });

    this.systemMonitoring.status$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.servicesDown = this.systemMonitoring.getServicesDown();
      });

    // Mock active users - in real app, this would come from user service
    this.activeUsers = 5; // Based on users array from original component
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}