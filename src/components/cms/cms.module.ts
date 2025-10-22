import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsComponent } from './cms.component';

// Define simple routes within this module
const routes: Routes = [
  {
    path: '',
    component: CmsComponent
  }
];

@NgModule({
  declarations: [
    CmsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CmsComponent
  ]
})
export class CmsModule { }