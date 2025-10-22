import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
    <div class="content-management">
      <h2>Content Management</h2>
      <div class="content-placeholder">
        <span class="material-icons">article</span>
        <p>Content management interface coming soon...</p>
      </div>
    </div>
  `,
  styleUrls: ['./content.component.scss']
})
export class ContentComponent { }