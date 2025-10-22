import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SystemMonitoringService, SystemMetric } from '../../../services/system/system-monitoring.service';

@Component({
  selector: 'dashboard-system-metrics',
  templateUrl: './system-metrics.component.html',
  styleUrls: ['./system-metrics.component.scss']
})
export class SystemMetricsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  metrics: SystemMetric[] = [];
  lastUpdated = new Date();

  constructor(private systemMonitoring: SystemMonitoringService) {}

  ngOnInit(): void {
    this.systemMonitoring.metrics$
      .pipe(takeUntil(this.destroy$))
      .subscribe(metrics => {
        this.metrics = metrics;
        this.lastUpdated = new Date();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onViewMore(): void {
    // Navigate to detailed metrics page
    console.log('Navigate to detailed system metrics');
  }

  getAbsoluteValue(value: number | undefined): number {
    return Math.abs(value || 0);
  }

  trackByMetricName(index: number, metric: SystemMetric): string {
    return metric.name;
  }
}