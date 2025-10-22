import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SystemMonitoringService, SecurityAlert } from '../../../services/system/system-monitoring.service';

@Component({
  selector: 'dashboard-security-alerts',
  templateUrl: './security-alerts.component.html',
  styleUrls: ['./security-alerts.component.scss']
})
export class SecurityAlertsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  alerts: SecurityAlert[] = [];
  unresolvedAlerts: SecurityAlert[] = [];

  constructor(private systemMonitoring: SystemMonitoringService) {}

  ngOnInit(): void {
    this.systemMonitoring.alerts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(alerts => {
        this.alerts = alerts;
        this.unresolvedAlerts = this.systemMonitoring.getUnresolvedAlerts();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onResolveAlert(alertId: string): void {
    this.systemMonitoring.resolveAlert(alertId);
  }

  onViewMore(): void {
    // Navigate to detailed security alerts page
    console.log('Navigate to detailed security alerts');
  }

  getAlertIcon(type: SecurityAlert['type']): string {
    switch (type) {
      case 'critical': return 'dangerous';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'info';
    }
  }

  trackByAlertId(index: number, alert: SecurityAlert): string {
    return alert.id;
  }
}