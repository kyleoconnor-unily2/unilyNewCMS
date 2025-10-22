import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CmsSidebarComponent } from './cms-sidebar/cms-sidebar.component';
import { CmsHeaderComponent } from './cms-header/cms-header.component';

@NgModule({
  declarations: [
    CmsSidebarComponent,
    CmsHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CmsSidebarComponent,
    CmsHeaderComponent
  ]
})
export class SharedModule { }