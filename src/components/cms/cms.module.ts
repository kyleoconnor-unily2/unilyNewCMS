import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CmsComponent } from './cms.component';
import { ForexWidgetComponent } from '../forex-widget/forex-widget.component';

// Define simple routes within this module
const routes: Routes = [
  {
    path: '',
    component: CmsComponent
  }
];

@NgModule({
  declarations: [
    CmsComponent,
    ForexWidgetComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CmsComponent
  ]
})
export class CmsModule { }