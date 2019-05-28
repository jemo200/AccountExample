import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GstAddComponent } from './gst-add/gst-add.component';
import { GstEditComponent } from './gst-edit/gst-edit.component';
import { GstGetComponent } from './gst-get/gst-get.component';
import { PortalComponent } from './portal/portal.component';

const routes: Routes = [
  {
    path: 'account/create',
    component: GstAddComponent
  },
  {
    path: 'account/edit/:id',
    component: GstEditComponent
  },
  {
    path: 'account',
    component: GstGetComponent
  },
  {
    path: '',
    component: PortalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
