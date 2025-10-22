import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  template: `
    <div class="analytics-management">
      <h2>Analytics Dashboard</h2>
      <div class="analytics-placeholder">
        <span class="material-icons">analytics</span>
        <p>Analytics dashboard coming soon...</p>
      </div>
    </div>
  `,
  styles: [`
    .analytics-management .analytics-placeholder {
      background: white;
      border-radius: 12px;
      padding: 48px 32px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
    }
    .material-icons { font-size: 48px; color: #d1d5db; margin-bottom: 16px; }
    p { margin: 0; color: #6b7280; font-size: 16px; line-height: 1.5; }
  `]
})
export class AnalyticsComponent { }