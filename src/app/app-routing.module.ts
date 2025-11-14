import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../components/cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: 'cms',
    loadChildren: () => import('../components/cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }