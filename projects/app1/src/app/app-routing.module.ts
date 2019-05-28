import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GstLoginComponent } from './gst-login/gst-login.component';
import { GstAddComponent } from './gst-add/gst-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: GstLoginComponent
  },
  {
    path: 'create',
    component: GstAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
