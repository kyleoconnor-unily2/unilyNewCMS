import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SecurityAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: Date;
  resolved: boolean;
}

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  icon: string;
  change?: number;
}

export interface SystemStatus {
  service: string;
  status: 'online' | 'degraded' | 'offline';
  uptime: string;
  lastCheck: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SystemMonitoringService {
  private alertsSubject = new BehaviorSubject<SecurityAlert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Failed Login Attempts',
      description: '15 failed login attempts detected from IP 192.168.1.100 in the last hour',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      resolved: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Database Connection Slow',
      description: 'Database response time increased by 40% - monitoring required',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      resolved: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Backup Completed',
      description: 'Daily system backup completed successfully',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      resolved: true
    }
  ]);

  private metricsSubject = new BehaviorSubject<SystemMetric[]>([
    {
      name: 'System Load',
      value: 78,
      unit: '%',
      status: 'warning',
      icon: 'memory',
      change: 12
    },
    {
      name: 'API Response',
      value: 245,
      unit: 'ms',
      status: 'healthy',
      icon: 'speed',
      change: -8
    },
    {
      name: 'Disk Usage',
      value: 67,
      unit: '%',
      status: 'healthy',
      icon: 'storage',
      change: 3
    },
    {
      name: 'Active Sessions',
      value: 142,
      unit: 'users',
      status: 'healthy',
      icon: 'people',
      change: 15
    }
  ]);

  private statusSubject = new BehaviorSubject<SystemStatus[]>([
    {
      service: 'Content API',
      status: 'online',
      uptime: '99.8%',
      lastCheck: new Date(Date.now() - 2 * 60 * 1000)
    },
    {
      service: 'User Authentication',
      status: 'degraded',
      uptime: '97.2%',
      lastCheck: new Date(Date.now() - 1 * 60 * 1000)
    },
    {
      service: 'File Upload Service',
      status: 'online',
      uptime: '99.9%',
      lastCheck: new Date(Date.now() - 30 * 1000)
    },
    {
      service: 'Email Notifications',
      status: 'offline',
      uptime: '89.4%',
      lastCheck: new Date(Date.now() - 5 * 60 * 1000)
    }
  ]);

  alerts$ = this.alertsSubject.asObservable();
  metrics$ = this.metricsSubject.asObservable();
  status$ = this.statusSubject.asObservable();

  get securityAlerts(): SecurityAlert[] {
    return this.alertsSubject.value;
  }

  get systemMetrics(): SystemMetric[] {
    return this.metricsSubject.value;
  }

  get systemStatus(): SystemStatus[] {
    return this.statusSubject.value;
  }

  getCriticalIssuesCount(): number {
    return this.securityAlerts.filter(alert => alert.type === 'critical' && !alert.resolved).length;
  }

  getSystemHealthScore(): number {
    const metrics = this.systemMetrics;
    const healthyCount = metrics.filter(m => m.status === 'healthy').length;
    return Math.round((healthyCount / metrics.length) * 100);
  }

  getServicesDown(): number {
    return this.systemStatus.filter(service => service.status === 'offline').length;
  }

  getUnresolvedAlerts(): SecurityAlert[] {
    return this.securityAlerts.filter(alert => !alert.resolved);
  }

  resolveAlert(alertId: string): void {
    const alerts = this.alertsSubject.value.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    );
    this.alertsSubject.next(alerts);
  }

  addAlert(alert: Omit<SecurityAlert, 'id'>): void {
    const newAlert: SecurityAlert = {
      ...alert,
      id: Date.now().toString()
    };
    const alerts = [newAlert, ...this.alertsSubject.value];
    this.alertsSubject.next(alerts);
  }

  updateMetric(metricName: string, value: number, change?: number): void {
    const metrics = this.metricsSubject.value.map(metric => 
      metric.name === metricName ? { ...metric, value, change } : metric
    );
    this.metricsSubject.next(metrics);
  }

  updateServiceStatus(serviceName: string, status: SystemStatus['status']): void {
    const services = this.statusSubject.value.map(service => 
      service.service === serviceName 
        ? { ...service, status, lastCheck: new Date() } 
        : service
    );
    this.statusSubject.next(services);
  }
}