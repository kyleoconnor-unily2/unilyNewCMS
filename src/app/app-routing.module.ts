import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/cms',
    pathMatch: 'full'
  },
  {
    path: 'cms',
    loadChildren: () => import('../components/cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    redirectTo: '/cms'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }